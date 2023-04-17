var searchHistory = [];
function getItems() {
    var searchedCities = JSON.parse(localStorage.getItem("searchHistory"));
    if (searchedCities !== null) {
        searchHistory = searchedCities;
    };
     // cities list
    for (i = 0; i < searchHistory.length; i++) {
        if (i == 6) {
            break;
          }
        // Boostrap list https://getbootstrap.com/docs/4.0/components/list-group/
        listButton = $("<a>").attr({
            class: "list-group-item list-group-item-action",
            href: "#"
        });
        // append search history
        listButton.text(searchHistory[i]);
        $(".list-group").append(listButton);
    }
};
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

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=098eca82700d1dca25bbbf3a0c5e9487",
            method: "GET"
        // 5-Day Forecast columns
        }).then(function (response) {
            for (i = 0; i < 5; i++) {
                // columns
                var nextDayCard = $("<div>").attr("class", "col fiveDay bg-primary text-white");
                $("#prediction").append(nextDayCard);
                var myDate = new Date(response.list[i * 6].dt * 1000);
                nextDayCard.append($("<h4>").html(myDate.toLocaleDateString()));
                // icon URL
                var iconCode = response.list[i * 6].weather[0].icon;
                var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
                nextDayCard.append($("<img>").attr("src", iconURL));
                // Temperature = Celcius
                var temp = response.list[i * 6].main.temp - 273.15;
                nextDayCard.append($("<p>").html("Temp: " + temp.toFixed(1) + " °C"));
                // Humidity
                var humidity = response.list[i * 6].main.humidity;
                nextDayCard.append($("<p>").html("Humidity: " + humidity + "%"));
                //Wind Speed
                var windSpeed = response.list[i * 6].wind.speed;
                nextDayCard.append($("<p>").html("Wind: " + windSpeed + " KPH"));
            }
        })
    })
};
// Input search
$("#search-button").click(function() {
    city = $("#search-input").val();
    getData();
    var checkArray = searchHistory.includes(city);
    if (checkArray == true) {
        return
    }
    else {
        searchHistory.push(city);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        var listButton = $("<a>").attr({
            class: "list-group-item list-group-item-action",
            href: "#"
        });
        listButton.text(city);
        $(".list-group").append(listButton);
    };
});
// event listener for search history
$(".list-group-item").click(function() {
    city = $(this).text();
    getData();
});