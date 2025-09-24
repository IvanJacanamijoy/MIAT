const knex = require('knex')(require('../config/knexfile').development);
const cron = require('node-cron');

class VisitaCancelationService {
    constructor() {
        this.isRunning = false;
    }

    /**
     * Identifica y procesa visitas técnicas que han pasado 24 horas
     * - Cancela visitas SIN diagnóstico
     * - Finaliza visitas CON diagnóstico
     */
    async cancelExpiredVisits() {
        try {
            console.log('🔍 Verificando visitas técnicas vencidas...');
            
            // Calcular la fecha y hora límite (24 horas atrás)
            const now = new Date();
            const twentyFourHoursAgo = new Date(now.getTime() - (24 * 60 * 60 * 1000));
            
            // Formatear fecha para comparación con la base de datos
            const limitDate = twentyFourHoursAgo.toISOString().split('T')[0]; // YYYY-MM-DD
            const limitTime = twentyFourHoursAgo.toTimeString().split(' ')[0].substring(0, 5); // HH:MM
            
            // Buscar visitas que cumplan los criterios:
            // 1. Fecha y hora de la cita han pasado hace más de 24 horas
            // 2. Estado no es "Cancelada" (IdEstado = 7) ni "Finalizado" (IdEstado = 4)
            // 3. Estado es "Pendiente" (IdEstado = 5) o "Aceptada" (IdEstado = 6) o "En proceso" (IdEstado = 3)
            const expiredVisits = await knex('CitaServicio')
                .leftJoin('diagnostico', 'CitaServicio.IdCita', 'diagnostico.IdCita')
                .select(
                    'CitaServicio.IdCita', 
                    'CitaServicio.Fecha', 
                    'CitaServicio.Hora', 
                    'CitaServicio.IdEstado',
                    'diagnostico.IdDiagnostico'
                )
                .where(function() {
                    // Visitas cuya fecha es anterior a la fecha límite
                    this.where('CitaServicio.Fecha', '<', limitDate)
                        // O visitas de la fecha límite pero con hora anterior
                        .orWhere(function() {
                            this.where('CitaServicio.Fecha', '=', limitDate)
                                .andWhere('CitaServicio.Hora', '<', limitTime);
                        });
                })
                // Solo visitas que no estén canceladas ni finalizadas
                .whereNotIn('CitaServicio.IdEstado', [4, 7]) // 4 = Finalizado, 7 = Cancelada
                // Solo visitas en estados que pueden ser procesadas automáticamente
                .whereIn('CitaServicio.IdEstado', [3, 5, 6]); // 3 = En proceso, 5 = Pendiente, 6 = Aceptada

            if (expiredVisits.length === 0) {
                console.log('✅ No se encontraron visitas técnicas vencidas');
                return { 
                    canceledCount: 0, 
                    finalizedCount: 0, 
                    visits: [] 
                };
            }

            console.log(`📋 Encontradas ${expiredVisits.length} visitas técnicas vencidas`);

            // Separar visitas con y sin diagnóstico
            const visitsWithDiagnosis = expiredVisits.filter(visit => visit.IdDiagnostico !== null);
            const visitsWithoutDiagnosis = expiredVisits.filter(visit => visit.IdDiagnostico === null);

            let canceledCount = 0;
            let finalizedCount = 0;

            // Cancelar visitas SIN diagnóstico
            if (visitsWithoutDiagnosis.length > 0) {
                const visitIdsToCancel = visitsWithoutDiagnosis.map(visit => visit.IdCita);
                
                canceledCount = await knex('CitaServicio')
                    .whereIn('IdCita', visitIdsToCancel)
                    .update({ IdEstado: 7 }); // 7 = Cancelada

                console.log(`❌ Se cancelaron automáticamente ${canceledCount} visitas SIN diagnóstico`);
                visitsWithoutDiagnosis.forEach(visit => {
                    console.log(`   - Cita ID: ${visit.IdCita}, Fecha: ${visit.Fecha}, Hora: ${visit.Hora}, Estado anterior: ${visit.IdEstado} → CANCELADA`);
                });
            }

            // Finalizar visitas CON diagnóstico
            if (visitsWithDiagnosis.length > 0) {
                const visitIdsToFinalize = visitsWithDiagnosis.map(visit => visit.IdCita);
                
                finalizedCount = await knex('CitaServicio')
                    .whereIn('IdCita', visitIdsToFinalize)
                    .update({ IdEstado: 4 }); // 4 = Finalizado

                console.log(`✅ Se finalizaron automáticamente ${finalizedCount} visitas CON diagnóstico`);
                visitsWithDiagnosis.forEach(visit => {
                    console.log(`   - Cita ID: ${visit.IdCita}, Fecha: ${visit.Fecha}, Hora: ${visit.Hora}, Estado anterior: ${visit.IdEstado} → FINALIZADA`);
                });
            }

            return {
                canceledCount,
                finalizedCount,
                visits: expiredVisits,
                visitsWithDiagnosis: visitsWithDiagnosis.length,
                visitsWithoutDiagnosis: visitsWithoutDiagnosis.length
            };

        } catch (error) {
            console.error('❌ Error al procesar visitas técnicas vencidas:', error);
            throw error;
        }
    }

    /**
     * Inicia el cron job para verificar visitas vencidas cada hora
     */
    startAutomaticCancelation() {
        if (this.isRunning) {
            console.log('⚠️ El servicio de cancelación automática ya está ejecutándose');
            return;
        }

        // Ejecutar cada hora (0 minutos de cada hora)
        this.cronJob = cron.schedule('0 * * * *', async () => {
            console.log('⏰ Ejecutando verificación automática de visitas vencidas...');
            try {
                await this.cancelExpiredVisits();
            } catch (error) {
                console.error('❌ Error en la verificación automática:', error);
            }
        }, {
            scheduled: false // No iniciar automáticamente
        });

        this.cronJob.start();
        this.isRunning = true;
        
        console.log('🚀 Servicio de cancelación automática iniciado');
        console.log('📅 Se ejecutará cada hora para verificar visitas vencidas');
        
        // Ejecutar una verificación inicial
        this.cancelExpiredVisits().catch(error => {
            console.error('❌ Error en la verificación inicial:', error);
        });
    }

    /**
     * Detiene el cron job
     */
    stopAutomaticCancelation() {
        if (this.cronJob) {
            this.cronJob.stop();
            this.isRunning = false;
            console.log('🛑 Servicio de cancelación automática detenido');
        }
    }

    /**
     * Obtiene el estado del servicio
     */
    getStatus() {
        return {
            isRunning: this.isRunning,
            nextExecution: this.cronJob ? 'Cada hora' : 'No programado'
        };
    }
}

module.exports = new VisitaCancelationService();