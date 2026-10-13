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
                contenidoTabla += `
                <tr>
                    <td style="text-align: center">${servicio.nombre}</td>
                    <td style="text-align: center">${servicio.descripcion}</td>
                    <td style="text-align: center">${servicio.precio}</td>
                    <td style="text-align: right">
                    <button type="button" class="btn" title="Editar" onclick="ModalEditar(${servicio.servicioID})">
                    <i class="fa-solid fa-pen-to-square" width="20" height="20"></i>
                    </button>
                    </td>
                    <td style="text-align: left">
                    <button type="button" class="btn" title="Eliminar" onclick="EliminarServicio(${servicio.servicioID})">
                    <i class="fa-solid fa-trash" width="20" height="20"></i>
                    </button>
                    </td>
                </tr>
             `;
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