$(function() {


    $('#addCarForm').on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: 'https://webtechcars.herokuapp.com/api/cars',
            data: $("#addCarForm").serialize(),
            success: function () {
                listCars();
            },
            error: function () {
                alert("Something went wrong!");
            }
        })
    });



    $('#addManufacturerForm').on("submit", function (e) {
        e.preventDefault();
        const manufacturerArr = $('form').serializeArray();
        const manufacturer = {
            name: manufacturerArr[0].value,
            country: manufacturerArr[1].value,
            founded: manufacturerArr[2].value
        };
        $.ajax({
            type: 'post',
            url: 'https://webtechcars.herokuapp.com/api/manufacturers',
            data: $(JSON.stringify(manufacturer)),
            dataType: "json",
            contentType: "application/json",
            success: function () {
                listManufacturers();
            },
            error: function () {
                alert("Something went wrong!");
            }
        })
    });

});

    function toHome() {
        $("#description").fadeIn(900);
        $(".contentImage").fadeIn(900);
        $("#listManufacturers").fadeOut(1);
        $("#listCar").fadeOut(1);
        $("#addCar").fadeOut(1);
        $("#addManufacturer").fadeOut(1);
    }

function listCars() {

    $("#description").fadeOut(700);
    $(".contentImage").fadeOut(700);
    $("#listCar").fadeIn(700);
    $("#listManufacturers").fadeOut(0);
    $("#addCar").fadeOut(0);
    $("#addManufacturer").fadeOut(0);


    $.getJSON(`https://webtechcars.herokuapp.com/api/cars`, function (data) {
        var table = $('<table id="listTableCar"></table>');
        table.append('<tr><th class="listth">Name</th><th class="listth">Consumption</th><th class="listth">Color</th><th class="listth">Manufacturer</th><th class="listth">Available</th><th class="listth">Year</th><th class="listth">Horsepower</th></tr>');
        $.each(data, function (key, value) {
            var row = $('<tr></tr>');
            var nameCell = $('<td class="listtd">' + value.name + '</td>');
            var consumptionCell = $('<td class="listtd">' + value.consumption +'</td>');
            var colorCell = $('<td class="listtd">' + value.color + '</td>');
            var manufacturerCell = $('<td class="listtdH">' + value.manufacturer +' </td>');
            var availableCell = $('<td class="listtd">' + value.avaiable + '</td>');
            var yearCell = $('<td class="listtd">' + value.year + '</td>');
            var horsepowerCell = $('<td class="listtd">' + value.horsepower + '</td>');
            row.append(nameCell);
            row.append(consumptionCell);
            row.append(colorCell);
            row.append(manufacturerCell);
            row.append(availableCell);
            row.append(yearCell);
            row.append(horsepowerCell);
            table.append(row)
        });
        $('#listCar').html(table);
    });

}

function listManufacturers() {
    $("#description").fadeOut(700);
    $(".contentImage").fadeOut(700);
    $("#listManufacturers").fadeIn(700);
    $("#listCar").fadeOut(0);
    $("#addCar").fadeOut(0);
    $("#addManufacturer").fadeOut(0);

    $.getJSON("https://webtechcars.herokuapp.com/api/manufacturers", function (data) {
        var table = $('<table id="listTableManufacturers"></table>');
        table.append('<tr><th class="listth">Name</th><th class="listth">Country</th><th class="listth">Founded</th></tr>');
        $.each(data, function (key, value) {
            var row = $('<tr></tr>');
            var nameCell = $('<td class="listtdH">' + value.name + '</td>');
            var countryCell = $('<td class="listtd">' + value.country + '</td>');
            var foundedCell = $('<td class="listtd">' + value.founded + '</td>');
            row.append(nameCell);
            row.append(countryCell);
            row.append(foundedCell);
            table.append(row)
        });
        $('#listManufacturers').html(table);
    });
}

function addCar() {
    $("#description").fadeOut(700);
    $(".contentImage").fadeOut(700);
    $("#listManufacturers").fadeOut(0);
    $("#listCar").fadeOut(0);
    $("#addCar").fadeIn(700);
    $("#addManufacturer").fadeOut(0);

    removeOptions(document.getElementById("dropdown"));


    let dropdown = $('#dropdown');

    dropdown.empty();

    dropdown.append('<option selected="true" disabled>Choose Manufacturer</option>');
    dropdown.prop('selectedIndex', 0);

    const url = 'https://webtechcars.herokuapp.com/api/manufacturers';

    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            dropdown.append($('<option></option>').attr('value', entry.id).text(entry.name));
        })
    });
}

function addManufacturer() {
    $("#description").fadeOut(700);
    $(".contentImage").fadeOut(700);
    $("#listManufacturers").fadeOut(0);
    $("#listCar").fadeOut(0);
    $("#addCar").fadeOut(0);
    $("#addManufacturer").fadeIn(700);
}


function removeOptions(selectbox) {
    var i;
    for (i = selectbox.options.length - 1; i >= 0; i--) {
        selectbox.remove(i);
    }
}


