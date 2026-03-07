import requests
import webbrowser

url = "https://api.thecatapi.com/v1/images/search"
response = requests.get(url)
data = response.json()

image_url = data[0]["url"]
print(data)

'''opens the image_url in the browser
print("Opening: ", image_url)
webbrowser.open(image_url) '''

#PRACTICING FILTERING BY VARIABLES
url2 = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m"
params = {
    "latitude": 52.52,
    "longitude": 13.41,
    "hourly": ["temperature_2m", "wind_speed_10m"]
}
response2 = requests.get(url2, params=params)
data2 = response2.json()
#get the data for the hourly data for temperature
temps = data2[0]["hourly"]["temperature_2m"] 
winds = data2[0]["hourly"]["wind_speed_10m"]
print(temps[5])
print(winds[5])

#PRACTICING PAGINATION
url3 = "https://pokeapi.co/api/v2/pokemon"
params = {
    "limit": 10, #10 Pokemon (results) per page
    "offset": 10, #start at the beginning (offset is how many results you skip)
}

response3 = requests.get(url3, params=params)
data3 = response3.json()
print(type(data3))

for p in data3["results"]:
    print(p["name"]) 

#NOTE: for the next page offset = 10, then offset = 20 for the next page etc.

#sorting test
names = [p["name"] for p in data3["results"]]
names.sort()
print(names)
