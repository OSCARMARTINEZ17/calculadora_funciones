const resultado = document.getElementById("resultado");

const botones = document.querySelectorAll("button");

botones.forEach(boton => {

    boton.addEventListener("click", () => {

        let valor = boton.textContent;

        // Limpiar pantalla
        if (valor === "C") {
            resultado.value = "0";
            return;
        }

        // Borrar último carácter
        if (valor === "←") {

            if (resultado.value.length > 1) {
                resultado.value = resultado.value.slice(0, -1);
            } else {
                resultado.value = "0";
            }

            return;
        }

        // Porcentaje
        if (valor === "%") {

            try {
                resultado.value = eval(resultado.value) / 100;
            } catch {
                resultado.value = "Error";
            }

            return;
        }

        // Resultado
        if (valor === "=") {

            try {

                if (resultado.value.includes("/0")) {
                    throw new Error("División por cero");
                }

                resultado.value = eval(resultado.value);

                setTimeout(() => {
                    resultado.value = "0";
                }, 3000);

            } catch {

                resultado.value = "Error";

                setTimeout(() => {
                    resultado.value = "0";
                }, 3000);
            }

            return;
        }

        // Validar operadores al inicio
        if (
            resultado.value === "0" &&
            ["+", "-", "*", "/"].includes(valor)
        ) {
            alert("El formato usado no es válido!");
            return;
        }

        // Punto decimal único
        if (valor === ".") {

            if (resultado.value.includes(".")) {
                return;
            }

            if (resultado.value === "0") {
                resultado.value = "0.";
                return;
            }
        }

        // Reemplazar cero inicial
        if (resultado.value === "0") {
            resultado.value = valor;
        } else {
            resultado.value += valor;
        }

    });

});