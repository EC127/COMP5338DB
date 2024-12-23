import pandas as pd
import json

def preprocess_co2(file_path, output_path):
    with open("co2.json", 'r', encoding='utf-8') as file:
        data = json.load(file)

    array_data = []

    _id_counter = 1

    for region, region_data in data.items():
        processed_region_data = {
            "_id": _id_counter,  
            "region": region,
            "iso_code": region_data['iso_code'],
            "data": region_data['data']  
        }
        array_data.append(processed_region_data)
        _id_counter += 1  

    with open("processed_co2.json", 'w', encoding='utf-8') as output_file:
        json.dump(array_data, output_file, ensure_ascii=False, indent=4)

co2_file = "co2.json"

processed_co2_file = "processed_co2.json"

preprocess_co2(co2_file, processed_co2_file)
