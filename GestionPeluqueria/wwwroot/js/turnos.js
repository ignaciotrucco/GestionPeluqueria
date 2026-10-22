$(document).ready(function () {

    $("#btnCrearTurno").click(function () {
        CrearTurno();
    });

});

function CrearTurno() {

    let ventanaWhatsApp = window.open("about:blank", "_blank");

    let clienteID = parseInt($("#ClienteID").val()) || 0;
    let dni = $("#DNI").val().trim();
    let servicioID = parseInt($("#ServicioID").val()) || 0;
    let fecha = $("#Fecha").val();
    let hora = $("#Hora").val();
    let montoSena = parseFloat($("#MontoSeña").val()) || 0;

    if (dni === "" || servicioID <= 0 || fecha === "" || hora === "") {
        if (ventanaWhatsApp) ventanaWhatsApp.close();

        Swal.fire("Atención", "Completá el DNI, el servicio, la fecha y la hora.", "warning");
        return;
    }

    if (clienteID === 0) {

        let nombre = $("#NombreCompleto").val().trim();
        let telefono = $("#Telefono").val().trim();

        if (nombre === "" || telefono === "") {
            if (ventanaWhatsApp) ventanaWhatsApp.close();

            Swal.fire("Atención", "Completá el nombre y el teléfono del cliente.", "warning");
            return;
        }

        $.ajax({
            url: "/Clientes/GuardarCliente",
            type: "POST",
            dataType: "json",
            data: {
                DNI: dni,
                NombreCompleto: nombre,
                FechaNacimiento: $("#FechaNacimiento").val() || null,
                Telefono: telefono,
                Email: $("#Email").val(),
                Observaciones: $("#ObservacionesCliente").val()
            },
            success: function (respuesta) {

                if (respuesta.resultado !== "OK") {
                    if (ventanaWhatsApp) ventanaWhatsApp.close();
                    Swal.fire("Error", respuesta.resultado, "error");
                    return;
                }

                $("#ClienteID").val(respuesta.clienteID);

                GuardarTurno(respuesta.clienteID, ventanaWhatsApp);
            },
            error: function () {
                if (ventanaWhatsApp) ventanaWhatsApp.close();

                Swal.fire("Error", "No se pudo guardar el cliente.", "error");
            }
        });

    } else {
        GuardarTurno(clienteID, ventanaWhatsApp);
    }
}


function GuardarTurno(clienteID, ventanaWhatsApp) {

    let fecha = $("#Fecha").val();
    let hora = $("#Hora").val();

    $.ajax({
        url: "/Turnos/CrearTurno",
        type: "POST",
        dataType: "json",
        data: {
            ClienteID: clienteID,
            ServicioID: $("#ServicioID").val(),
            FechaHora: fecha + "T" + hora,
            MontoSeña: $("#MontoSeña").val() || 0,
            Observaciones: $("#ObservacionesTurno").val()
        },
        success: function (respuesta) {

            if (respuesta.resultado !== "OK") {
                if (ventanaWhatsApp) ventanaWhatsApp.close();

                Swal.fire("Error", respuesta.resultado, "error")
                    .then(() => location.reload());

                return;
            }

            let nombre = $("#NombreCompleto").val().trim();
            let telefono = $("#Telefono").val().trim();

            let servicio = $("#ServicioID option:selected").text().trim();
            let fechaFormateada = fecha.split("-").reverse().join("/");
            let monto = parseFloat($("#MontoSeña").val()) || 0;

            // WhatsApp requiere el número en formato internacional,
            // solo con dígitos: sin +, espacios ni guiones.
            let numero = telefono.replace(/\D/g, "");

            let mensaje =
                "¡Hola " + nombre + "! Tu turno fue registrado correctamente.\n\n" +
                "Servicio: " + servicio + "\n" +
                "Fecha: " + fechaFormateada + "\n" +
                "Hora: " + hora + "\n" +
                "Monto de la seña: $" + monto.toLocaleString("es-AR") + "\n\n" +
                "Para confirmar tu turno, realizá la transferencia de la seña. ¡Muchas gracias!";

            if (numero !== "" && ventanaWhatsApp) {
                ventanaWhatsApp.location.href =
                    "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensaje);
            } else if (ventanaWhatsApp) {
                ventanaWhatsApp.close();
            }

            Swal.fire({
                icon: "success",
                title: "¡Turno creado!",
                text: numero !== ""
                    ? "El turno se guardó. Revisá WhatsApp y presioná Enviar."
                    : "El turno se guardó, pero el teléfono no es válido.",
                confirmButtonText: "Aceptar"
            }).then(() => location.reload());
        },
        error: function () {
            if (ventanaWhatsApp) ventanaWhatsApp.close();

            Swal.fire("Error", "No se pudo crear el turno.", "error")
                .then(() => location.reload());
        }
    });
}

function MostrarMensajeTurno(mensaje, tipo) {
    $("#mensajeTurno")
        .removeClass("d-none alert-success alert-danger alert-warning alert-info")
        .addClass("alert-" + tipo)
        .text(mensaje);
}