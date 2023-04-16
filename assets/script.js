var city;
var wConditions = $(".card-body");
getItems();

function getData() {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=098eca82700d1dca25bbbf3a0c5e9487"
    wConditions.empty();
    $("#prediction").empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var date = moment().format(" DD/MM/YYYY");
        var iconCode = response.weather[0].icon;
        var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
        var name = $("<h3>").html(city + date);
        wConditions.prepend(name);
        wConditions.append($("<img>").attr("src", iconURL));
        var temp = response.main.temp - 273.15;
        wConditions.append($("<p>").html("Temperature: " + temp.toFixed(1) + " °C"));
        var humidity = response.main.humidity;
        wConditions.append($("<p>").html("Humidity: " + humidity + "%"));
        var windSpeed = response.wind.speed;
        wConditions.append($("<p>").html("Wind Speed: " + windSpeed + " KPH"));
    })
};