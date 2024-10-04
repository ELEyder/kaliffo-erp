export const getReporteUsuario = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/usuario/reporte/${id}`, {
        method: "GET",
      });
  
      if (!response.ok) {
        console.log("Error al obtener el PDF");
      }
  
      const pdf = await response.blob();
  
      const url = window.URL.createObjectURL(pdf);
      window.open(url);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  