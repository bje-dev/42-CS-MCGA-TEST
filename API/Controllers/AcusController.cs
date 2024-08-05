using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AcousticController : ControllerBase
    {
        [HttpPost("calculate-intensity")]
        public ActionResult<IntensityResponseDto> CalculateIntensity([FromBody] IntensityRequestDto request)
        {
            var intensidad = CalculateAcousticIntensity(request.area, request.potencia);

            var response = new IntensityResponseDto
            {
                intensidad = intensidad

            };

            return Ok(response);
        }

        [HttpPost("calculate-power")]
        public ActionResult<IntensityResponseDto> CalculatePower([FromBody] PowerRequestDto request)
        {
            var potencia = CalculateAcousticPower(request.area, request.intensidad);

            var response = new PowerResponseDto
            {

                potencia = potencia
            };

            return Ok(response);
        }

        [HttpPost("calculate-power-with-pressure")]
        public ActionResult<IntensityResponseDto> CalculatePowerWithPressure([FromBody] PowerwpRequestDto request)
        {
            var potenciaconpresion = CalculateAcousticPower(request.area, request.presion, request.densidad, request.velocidad);

            var response = new PowerwpResponseDto
            {
                potenciaconpresion = potenciaconpresion
            };

            return Ok(response);
        }

        private double CalculateAcousticPower(double area, double presion, double densidad, double velocidad)
        {
            return Math.Pow(presion, 2) * area / (densidad * velocidad);
        }

        private double CalculateAcousticIntensity(double area, double potencia)
        {
            return potencia / area;
        }

        private double CalculateAcousticPower(double area, double intensidad)
        {
            return area * intensidad;
        }
    }
}
