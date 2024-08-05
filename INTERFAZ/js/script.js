

function textboxesIntensidad() {

    const checkbox = document.getElementById('opcionintensidad');
  
    if (checkbox.checked) {
        document.getElementById('campoArea').style.display = 'block';
        document.getElementById('campoPotencia').style.display = 'block';
        document.getElementById('campoIntensidad').style.display = 'none';
        document.getElementById('campoPresion').style.display = 'none';
        document.getElementById('campoDensidad').style.display = 'none';
        document.getElementById('campoVelocidad').style.display = 'none';
        document.getElementById('botonIntensidad').style.display = 'block';
        document.getElementById('botonPotencia').style.display = 'none';
        document.getElementById('botonPotenciaPresion').style.display = 'none';
    
    }
}

function textboxesPotencia() {

    const checkbox = document.getElementById('opcionpotencia');

    if (checkbox.checked) {
        document.getElementById('campoArea').style.display = 'block';
        document.getElementById('campoPotencia').style.display = 'none';
        document.getElementById('campoIntensidad').style.display = 'block';
        document.getElementById('campoPresion').style.display = 'none';
        document.getElementById('campoDensidad').style.display = 'none';
        document.getElementById('campoVelocidad').style.display = 'none';
        document.getElementById('botonIntensidad').style.display = 'none';
        document.getElementById('botonPotencia').style.display = 'block';
        document.getElementById('botonPotenciaPresion').style.display = 'none';

    }
}

function textboxesPotenciaPresion() {

    const checkbox = document.getElementById('opcionpotenciapresion');

    if (checkbox.checked) {
        document.getElementById('campoArea').style.display = 'block';
        document.getElementById('campoPotencia').style.display = 'none';
        document.getElementById('campoIntensidad').style.display = 'none';
        document.getElementById('campoPresion').style.display = 'block';
        document.getElementById('campoDensidad').style.display = 'block';
        document.getElementById('campoVelocidad').style.display = 'block';
        document.getElementById('botonIntensidad').style.display = 'none';
        document.getElementById('botonPotencia').style.display = 'none';
        document.getElementById('botonPotenciaPresion').style.display = 'block';

    }
}



async function calcularIntensidad() {
    const area = document.getElementById('area');
    const potencia = document.getElementById('potencia');

    if (parseFloat(area.value) < 1 || parseFloat(potencia.value) < 1) {
        document.getElementById('result').innerHTML = 'Los valores no pueden ser cero o negativos.';
        return;
    }

    const data = {
        area: parseFloat(area.value),
        potencia: parseFloat(potencia.value)
    };

    try {
        const response = await fetch('http://localhost:5128/api/Acoustic/calculate-intensity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        document.getElementById('result').innerHTML = `Intensidad Acústica: ${result.intensidad} I`;
    } catch (error) {
        document.getElementById('result').innerHTML = 'Error en el cálculo de la intensidad.';
    }
}

async function calcularPotencia() {
    const area = document.getElementById('area');
    const intensidad = document.getElementById('intensidad');

    if (parseFloat(area.value) < 1 || parseFloat(intensidad.value) < 1) {
        document.getElementById('result').innerHTML = 'Los valores no pueden ser cero o negativos.';
        return;
    }

    const data = {
        area: parseFloat(area.value),
        intensidad: parseFloat(intensidad.value)
    };

    try {
        const response = await fetch('http://localhost:5128/api/Acoustic/calculate-power', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }1

        const result = await response.json();
        document.getElementById('result').innerHTML = `Potencia Acústica: ${result.potencia} W`;
    } catch (error) {
        document.getElementById('result').innerHTML = 'Error en el cálculo de la potencia.';
    }
}
async function calcularPotenciaPresion() {
    const area = document.getElementById('area');
    const presion = document.getElementById('presion');
    const densidad = document.getElementById('densidad');
    const velocidad = document.getElementById('velocidad');

    if (parseFloat(area.value) < 1 || parseFloat(presion.value) < 1 || parseFloat(densidad.value) < 1 || parseFloat(velocidad.value) < 1) {
        document.getElementById('result').innerHTML = 'Los valores no pueden ser cero o negativos.';
        return;
    }

    const data = {
        area: parseFloat(area.value),
        presion: parseFloat(presion.value),
        densidad: parseFloat(densidad.value),
        velocidad: parseFloat(velocidad.value)
    };

    try {
        const response = await fetch('http://localhost:5128/api/Acoustic/calculate-power-with-pressure', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        document.getElementById('result').innerHTML = `Potencia Acústica con presion: ${result.potenciaconpresion} W/m²`;
    } catch (error) {
        document.getElementById('result').innerHTML = 'Error en el cálculo de la presion.';
    }
}
