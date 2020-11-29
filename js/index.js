$(function() {

    $('#addCarForm').on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: 'https://webtechcars.herokuapp.com/api/cars',
            data: JSON.stringify({
                name: $("#addCarName").val(),
                consumption: $("#addConsumption").val(),
                color: $("#addColor").val(),
                manufacturer: $("#dropdown").val(),
                avaiable: $("#addAvailable").val(),
                year: $("#addYear").val(),
                horsepower: $("#addHorsepower").val()

            }),
            contentType: "application/json",
            success: function () {
                alert("Car added to the database!");
            },
            error: function () {
                alert("Something went wrong!");
            }
        })
    });

    $('#addManufacturerForm').on("submit", function (e) {
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: 'https://webtechcars.herokuapp.com/api/manufacturers',
            data: JSON.stringify({
                name: $("#addName").val(),
                country: $("#addCountry").val(),
                founded: $("#addFounded").val()
            }),
            contentType: "application/json",
            success: function () {
                alert("Manufacturer added to the database!");
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
        let table = $('<table id="listTableCar"></table>');
        table.append('<tr><th class="listth">Modify</th><th class="listth">Delete</th><th class="listth">Name</th><th class="listth">Consumption</th><th class="listth">Color</th><th class="listth">Manufacturer</th><th class="listth">Available</th><th class="listth">Year</th><th class="listth">Horsepower</th></tr>');
        $.each(data, function (key, value) {
            let row = $('<tr></tr>');
            let delButton = $('<td class="listtd"><button value="Delete" onclick="deleteCar(\''+value._id+'\')"></td>');
            let modButton = $('<td class="listtd"><button value="Modify" onclick="modifyCar(\''+value._id+'\')"></td>');
            let nameCell = $('<td class="listtd">' + value.name + '</td>');
            let consumptionCell = $('<td class="listtd">' + value.consumption +'</td>');
            let colorCell = $('<td class="listtd">' + value.color + '</td>');
            let manufacturerCell = $('<td class="listtdH">' + value.manufacturer +' </td>');
            let availableCell = $('<td class="listtd">' + value.avaiable + '</td>');
            let yearCell = $('<td class="listtd">' + value.year + '</td>');
            let horsepowerCell = $('<td class="listtd">' + value.horsepower + '</td>');
            row.append(modButton);
            row.append(delButton);
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

function deleteCar (id) {
    $.ajax({
        url: `https://webtechcars.herokuapp.com/api/cars/`+id,
        type: 'DELETE',
        contentType: "application/json",
        success: function () {
            listCars();
        },
        error: function () {
            alert("Something went wrong!");
        }
    });
}

function modifyCar(id, form) {
    $.ajax({
        url: `https://webtechcars.herokuapp.com/api/cars/`+id,
        type: 'DELETE',
        contentType: "application/json",
        success: function () {
            addCar(form);
        },
        error: function () {
            alert("Something went wrong!");
        }
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
        let table = $('<table id="listTableManufacturers"></table>');
        table.append('<tr><th class="listth">Modify</th><th class="listth">Delete</th><th class="listth">Name</th><th class="listth">Country</th><th class="listth">Founded</th></tr>');
        $.each(data, function (key, value) {
            let row = $('<tr></tr>');
            let delButton = $('<td class="listtd"><button value="Delete" onclick="deleteManufacturer(\''+value._id+'\')"></td>');
            let modButton = $('<td class="listtd"><button value="Modify" onclick="modifyManufacturer(\''+value._id+'\')"></td>');
            let nameCell = $('<td class="listtdH">' + value.name + '</td>');
            let countryCell = $('<td class="listtd">' + value.country + '</td>');
            let foundedCell = $('<td class="listtd">' + value.founded + '</td>');
            row.append(modButton);
            row.append(delButton);
            row.append(nameCell);
            row.append(countryCell);
            row.append(foundedCell);
            table.append(row)
        });
        $('#listManufacturers').html(table);
    });
}

function deleteManufacturer (id) {
    $.ajax({
        url: `https://webtechcars.herokuapp.com/api/manufacturers/`+id,
        type: 'DELETE',
        contentType: "application/json",
        success: function () {
            listManufacturers();
        },
        error: function () {
            alert("Something went wrong!");
        }
    });
}

function fillField(id){
    $.ajax({
        type: 'POST',
        url: "https://webtechcars.herokuapp.com/api/manufacturers/"+id,
        data: {id : $("#id").val()},
        success: function(){
            $("#name").val("name");
            $("#country").val("country");
            $("#founded").val("founded");
        }
    });
}


async function modifyManufacturer(id, form) {
    await fillField(id)
    await addManufacturer(form)
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
    dropdown.append('<option  disabled>Choose Manufacturer</option>');
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
    let i;
    for (i = selectbox.options.length - 1; i >= 0; i--) {
        selectbox.remove(i);
    }
}


