window.onload = ListadoServicios();

function LimpiarModal() {
    document.getElementById("ServicioID").value = 0;
    document.getElementById("NombreServicio").value = "";
    document.getElementById("PrecioServicio").value = "";
    document.getElementById("DescripcionServicio").value = "";
    document.getElementById("NombreError").innerHTML = "";
    document.getElementById("DescripcionError").innerHTML = "";
    document.getElementById("PrecioError").innerHTML = "";
}

function NuevoRegistro() {
    $("#tituloModal").text("Nuevo Servicio")
}

function ListadoServicios() {
    $.ajax({
        url: '../../Servicios/ListadoServicios',
        data: {},
        type: 'POST',
        dataType: 'json',
        success: function (listadoServicios) {
            $("#modalServicios").modal("hide");
            LimpiarModal();

            let contenidoTabla = ``;

            $.each(listadoServicios, function (index, servicio) {

                if (servicio.eliminado) {
                    contenidoTabla += `
            <tr class="table-danger">
                <td style="text-align: center; text-decoration: line-through;">${servicio.nombre}</td>
                <td style="text-align: center; text-decoration: line-through;">${servicio.descripcion}</td>
                <td style="text-align: center; text-decoration: line-through;">${servicio.precio}</td>

                <td style="text-align: right">
                    <button type="button" class="btn" title="Activar"
                        onclick="ActivarServicio(${servicio.servicioID})">
                        <i class="fa-solid fa-check"></i>
                    </button>
                </td>

                <td style="text-align: left">
                    <button type="button" class="btn" title="Eliminar"
                        onclick="EliminarServicio(${servicio.servicioID})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
                }
                else {
                    contenidoTabla += `
            <tr>
                <td style="text-align: center">${servicio.nombre}</td>
                <td style="text-align: center">${servicio.descripcion}</td>
                <td style="text-align: center">${servicio.precio}</td>

                <td style="text-align: right">
                    <button type="button" class="btn" title="Editar"
                        onclick="ModalEditar(${servicio.servicioID})">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                </td>

                <td style="text-align: left">
                    <button type="button" class="btn" title="Desactivar"
                        onclick="DesactivarServicio(${servicio.servicioID})">
                        <i class="fa-solid fa-ban"></i>
                    </button>
                </td>
            </tr>
        `;
                }
            });

            document.getElementById("tbody-servicios").innerHTML = contenidoTabla;
        },
        error: function (xhr, status) {
            const Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                background: '#ffe7e7',
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "error",
                title: "Oops...",
                text: "Disculpe, existió un problema al cargar el listado",
            });
        }
    });
}

function GuardarRegistros() {
    $("NombreError").html("");
    $("DescripcionError").html("");
    $("PrecioError").html("");

    let servicioID = $("#ServicioID").val();
    let nombre = $("#NombreServicio").val().trim();
    let descripcion = $("#DescripcionServicio").val().trim();
    let precio = $("#PrecioServicio").val().trim();

    console.log(servicioID + " - " + nombre + " - " + descripcion + " - " + precio);

    let guardado = true;

    if (nombre == "") {
        $("#NombreError").html('<i class="fa-solid fa-triangle-exclamation"></i>' + "  Ingrese un nombre de servicio.")
        guardado = false;
    }
    if (descripcion == "") {
        $("#DescripcionError").html('<i class="fa-solid fa-triangle-exclamation"></i>' + "  Ingrese una descripción de servicio.")
        guardado = false;
    }
    if (precio == "") {
        $("#PrecioError").html('<i class="fa-solid fa-triangle-exclamation"></i>' + "  Ingrese un precio de servicio.")
        guardado = false;
    }

    if (guardado) {
        $.ajax({
            // la URL para la petición
            url: '../../Servicios/GuardarRegistros',
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data: { ServicioID: servicioID, Nombre: nombre, Descripcion: descripcion, Precio: precio },
            // especifica si será una petición POST o GET
            type: 'POST',
            // el tipo de información que se espera de respuesta
            dataType: 'json',
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success: function (resultado) {

                if (resultado != "") {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "bottom-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        background: '#e2ffd4',
                        width: "380px",
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        title: (resultado),
                    });

                }
                ListadoServicios();
            },

            // código a ejecutar si la petición falla;
            // son pasados como argumentos a la función
            // el objeto de la petición en crudo y código de estatus de la petición
            error: function (xhr, status) {

                const Toast = Swal.mixin({
                    toast: true,
                    position: "bottom-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    background: '#ffe7e7',
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Disculpe, existió un problema al guardar el servicio",
                });
            }
        });
    }
}

function ModalEditar(servicioID) {
    console.log(servicioID);

    $.ajax({
        // la URL para la petición
        url: '../../Servicios/ListadoServicios',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { ServicioID: servicioID },
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (listadoServicios) {
            let listadoServicio = listadoServicios[0];

            document.getElementById("ServicioID").value = servicioID;
            document.getElementById("NombreServicio").value = listadoServicio.nombre;
            document.getElementById("DescripcionServicio").value = listadoServicio.descripcion;
            document.getElementById("PrecioServicio").value = listadoServicio.precio;
            $("#tituloModal").text("Editar Servicio")
            $("#modalServicios").modal("show");

        },

        error: function (xhr, status) {
            const Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                background: '#ffe7e7',
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "error",
                title: "Oops...",
                text: "Disculpe, existió un problema al cargar el listado",
            });
        }
    });
}

function DesactivarServicio(servicioID) {
    $.ajax({
        url: '../../Servicios/DesactivarServicio',
        data: { servicioID },
        type: 'PUT',
        dataType: 'json',
        success: function (desactivarServicio) {

            if (desactivarServicio) {
                ListadoServicios();
                Swal.fire("Correcto", "Servicio desactivado correctamente.", "success");
            }
            else {
                Swal.fire("Atención", "No se puede desactivar el servicio porque existe un turno asociado.", "warning");
            }

        },
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al desactivar el servicio.');
        }
    });
}

function ActivarServicio(servicioID) {
    $.ajax({
        url: '../../Servicios/ActivarServicio',
        data: { servicioID },
        type: 'PUT',
        dataType: 'json',
        success: function (activarServicio) {
            ListadoServicios();
        },
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al activar el servicio.');
        }
    });
}

function EliminarServicio(servicioID) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            cancelButton: "btn btn-secondary",
            confirmButton: "btn btn-danger m-2",
        },
        buttonsStyling: false,

    });
    swalWithBootstrapButtons.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "question",
        background: '#ffeeee',
        showCancelButton: true,
        confirmButtonText: "¡Sí, eliminar!",
        cancelButtonText: "¡No, cancelar!",
        reverseButtons: false,
        width: '350px',

    }).then((result) => {
        if (result.isConfirmed) {

            $.ajax({
                // la URL para la petición
                url: '../../Servicios/EliminarServicio',
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data: { ServicioID: servicioID },
                // especifica si será una petición POST o GET
                type: 'POST',
                // el tipo de información que se espera de respuesta
                dataType: 'json',
                // código a ejecutar si la petición es satisfactoria;
                // la respuesta es pasada como argumento a la función
                success: function (resultado) {
                    if (!resultado) {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "bottom-end",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            background: '#fcffe7',
                            didOpen: (toast) => {
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                            }
                        });
                        Toast.fire({
                            icon: "warning",
                            title: "Oops...",
                            text: "No se puede eliminar, existen registros asociados",
                        });
                    }
                    ListadoServicios();
                },

                // código a ejecutar si la petición falla;
                // son pasados como argumentos a la función
                // el objeto de la petición en crudo y código de estatus de la petición
                error: function (xhr, status) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "bottom-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        background: '#ffe7e7',
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Disculpe, existió un problema al eliminar el servicio.",
                    });
                }
            });

            const Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                background: '#e2ffd4',
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "¡Borrado!",
                text: "El servicio ha sido eliminado.",
            });
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            const Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                background: '#ffe7e7',
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "error",
                title: "Anulado",
                text: "Tu registro está a salvo.",
            });
        }
    });

}
