import React from 'react';
import yahaerp from '../assets/yahaerp.jpg'; // Importa la imagen

const projects = [
  {
    title: "Yahasystem ERP",
    description: "Yahasystem ERP is a powerful enterprise resource planning software built in Windows Forms and backed by a robust SQL Server database. With a focus on efficiency and ease of use, Yahasystem ERP has been adopted by over 50 companies in Panama, helping them optimize operations, enhance decision-making, and effectively manage their resources. This comprehensive and reliable ERP has become an essential tool for businesses seeking an all-in-one solution to manage their operations.",
    link: "#",
    image: yahaerp
  },
  {
    title: "YahaPOS",
    description: "YayaPOS is a point of sale (POS) system developed in WPF, known for its speed, ease of use, and elegant design. It is designed to provide a seamless and efficient user experience, integrating perfectly with SQL Server to ensure robust performance and reliable data management. YayaPOS is ideal for businesses seeking a modern and efficient solution for their retail needs.",
    link: "#",
    image: "path/to/project2-image.jpg"
  },
  {
    title: "Yaha Workshop",
    description: "Yaha WorkShop is a vehicle workshop management application developed with Xamarin. It is designed to efficiently manage workshop operations, offering features such as the ability to store and track vehicle history. Yaha WorkShop is an essential tool for workshops looking to streamline their processes and maintain comprehensive records of the vehicles they service.",
    link: "#",
    image: "path/to/project3-image.jpg"
  },
  {
    title: "Yahamovil",
    description: "YahaMovil is a mobile application developed with Xamarin that allows users to place orders remotely and browse through a product catalog. Designed for efficiency and convenience, YahaMovil is the perfect tool for businesses looking to enhance their customer experience by offering a seamless and accessible ordering process.",
    link: "#",
    image: "path/to/project3-image.jpg"
  },
  {
    title: "Yahacourier",
    description: "Yahacourier is a delivery tracking application developed with Xamarin, utilizing Java libraries to control the integrated printers in devices. It enables companies to monitor delivery routes in real-time, allowing couriers to log completed deliveries, print receipts, and receive payments. Yahacourier is designed to streamline the delivery process, providing businesses with efficient tracking capabilities and ensuring that deliveries are recorded and managed seamlessly.",
    link: "#",
    image: "path/to/project3-image.jpg"
  },
  {
    title: "Yahasystem API",
    description: "Yahasystem API is a RESTful API developed with ASP.NET Core, featuring multiple endpoints that enable seamless communication between various applications and the Yahasystem ERP. This API is designed to facilitate integration, allowing different systems to interact efficiently with the ERP, ensuring smooth data exchange and operational consistency across the platform.",
    link: "#",
    image: "path/to/project3-image.jpg"
  },
  {
    title: "Odonto Prime Web Page",
    description: "Odonto Prime Web Page is a website designed with WordPress for a Chilean dental clinic. The site was created to provide a professional and user-friendly online presence for the clinic, offering patients easy access to information about services, appointments, and other essential details.",
    link: "https://odontoprime.cl/",
    image: "path/to/project3-image.jpg"
  },
  // Añade más proyectos aquí
];

const Projects = () => {
  return (
    <section id="projects" className="p-8 bg-gray-100 text-gray-900">
      <h2 className="text-2xl font-semibold mb-6 text-center">My Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transform hover:scale-105 transition duration-300">
            <div className="h-48 flex justify-center items-center bg-gray-200">
              <img src={project.image} alt={project.title} className="max-h-full max-w-full object-contain" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{project.title}</h3>
              <p className="text-gray-700 mb-4">{project.description}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                View Project
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
