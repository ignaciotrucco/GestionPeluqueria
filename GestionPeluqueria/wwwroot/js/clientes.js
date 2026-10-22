$(document).ready(function () {

    $("#btnBuscarCliente").click(function () {
        BuscarClientePorDNI();
    });

    // Si cambia el DNI, hay que volver a buscarlo.
    $("#DNI").on("input", function () {
        $("#ClienteID").val(0);
        $("#formularioCliente").hide();
        $("#NombreCompleto, #FechaNacimiento, #Telefono, #Email, #ObservacionesCliente").val("");
        OcultarMensajeCliente();
    });

});

function BuscarClientePorDNI() {

    let dni = $("#DNI").val().trim();

    if (dni === "") {
        MostrarMensajeCliente("Ingresá un DNI para buscar.", "warning");
        return;
    }

    $.ajax({
        url: "/Clientes/BuscarClientePorDNI",
        type: "GET",
        data: { dni: dni },
        dataType: "json",

        success: function (cliente) {

            if (cliente != null) {

                $("#ClienteID").val(cliente.clienteID);
                $("#NombreCompleto").val(cliente.nombreCompleto);
                $("#FechaNacimiento").val(
                    cliente.fechaNacimiento
                        ? cliente.fechaNacimiento.substring(0, 10)
                        : ""
                );
                $("#Telefono").val(cliente.telefono);
                $("#Email").val(cliente.email);
                $("#ObservacionesCliente").val(cliente.observaciones);

                $("#formularioCliente").hide();

                MostrarMensajeCliente(
                    "Cliente encontrado: " + cliente.nombreCompleto,
                    "success"
                );

            } else {

                $("#ClienteID").val(0);
                $("#formularioCliente").show();

                MostrarMensajeCliente(
                    "No existe un cliente con ese DNI. Completá sus datos para registrarlo.",
                    "warning"
                );
            }
        },

        error: function () {
            MostrarMensajeCliente("Ocurrió un error al buscar el cliente.", "danger");
        }
    });
}

function MostrarMensajeCliente(mensaje, tipo) {
    $("#mensajeCliente")
        .removeClass("d-none alert-success alert-danger alert-warning alert-info")
        .addClass("alert-" + tipo)
        .text(mensaje);
}

function OcultarMensajeCliente() {
    $("#mensajeCliente")
        .addClass("d-none")
        .text("");
}