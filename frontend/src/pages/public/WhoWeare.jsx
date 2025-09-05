import React from "react";
import { motion } from "framer-motion";
import { Users, Target, Lightbulb, ShieldCheck, Rocket } from "lucide-react";
import { fadeIn, staggerContainer } from "../../Animations/variants";

const WhoWeare = () => {
  return (
    <div className="min-h-screen bg-gray-200 relative max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="relative w-full h-[200px] bg-cover bg-center flex items-center justify-center rounded-2xl overflow-hidden shadow-lg mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-red-200 via-gray-200 to-red-200 animate-pulse"></div>
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.2 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold py-2 bg-red-500 bg-clip-text text-transparent drop-shadow-lg">
            ¿Quiénes Somos?
          </h1>
          <p className="mt-4 text-lg md:text-xl text-black max-w-2xl mx-auto">
            En MIAT trabajamos con pasión para transformar la experiencia tecnológica de nuestros clientes.
          </p>
        </motion.div>
      </section>

      {/* Misión y Visión */}
      <motion.section
        variants={staggerContainer(0.2, 0.15)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
      >
        <motion.div
          variants={fadeIn("up", 0.2)}
          whileHover={{ scale: 1.02 }}
          className="bg-white p-8 rounded-2xl shadow-lg"
        >
          <Target className="w-12 h-12 text-red-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Nuestra Misión</h2>
          <p className="text-gray-600">
            Brindar soluciones tecnológicas innovadoras que mejoren la vida de las personas y potencien la eficiencia de las empresas.
          </p>
        </motion.div>
        <motion.div
          variants={fadeIn("up", 0.3)}
          whileHover={{ scale: 1.02 }}
          className="bg-white p-8 rounded-2xl shadow-lg"
        >
          <Rocket className="w-12 h-12 text-red-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Nuestra Visión</h2>
          <p className="text-gray-600">
            Ser líderes en servicios tecnológicos en la región, reconocidos por nuestra innovación, calidad y compromiso con nuestros clientes.
          </p>
        </motion.div>
      </motion.section>

      {/* Valores */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Nuestros Valores
        </h2>
        <motion.div
          variants={staggerContainer(0.2, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <motion.div
            variants={fadeIn("up", 0.1)}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-md text-center"
          >
            <Lightbulb className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-800">Innovación</h3>
          </motion.div>
          <motion.div
            variants={fadeIn("up", 0.2)}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-md text-center"
          >
            <ShieldCheck className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-800">Confianza</h3>
          </motion.div>
          <motion.div
            variants={fadeIn("up", 0.3)}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-md text-center"
          >
            <Users className="w-10 h-10 text-blue-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-800">Trabajo en equipo</h3>
          </motion.div>
          <motion.div
            variants={fadeIn("up", 0.4)}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-md text-center"
          >
            <Rocket className="w-10 h-10 text-red-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-800">Excelencia</h3>
          </motion.div>
        </motion.div>
      </section>

      {/* Equipo */}
      <section>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Nuestro Equipo
        </h2>
        <motion.div
          variants={staggerContainer(0.2, 0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
          {[1, 2, 3].map((member, index) => (
            <motion.div
              key={member}
              variants={fadeIn("up", index * 0.2)}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <img
                src="/src/assets/images/services/imagen_servicio.png"
                alt="Miembro del equipo"
                className="w-full h-48 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-800">Nombre {member}</h3>
                <p className="text-gray-600 text-sm">Cargo en la empresa</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default WhoWeare;
