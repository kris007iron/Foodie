from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import pandas as pd
# xls_file = "tab2.xls"
# df = pd.read_excel(xls_file, skiprows=3, usecols=[0, 2, 5, 7, 10, 11])
# csv_file = "tab3.csv"
# df.to_csv(csv_file, index=False, encoding='UTF-8-sig')

import psycopg2

def read_csv(file_path):
    rows = []
    with open(file_path, 'r', encoding='utf-8-sig') as file:
        for line in file:
            row = line.strip().split(',')
            rows.append(row)
    return rows

# Usage:
csv_file_path = "tab3.csv"

try:
    connection = psycopg2.connect(user="postgres",
                                  password="postgres",
                                  host="127.0.0.1",
                                  port="5433",
                                  database="SampleDbFood")
    cursor = connection.cursor()

    data = read_csv(csv_file_path)
    for row in data:
        if len(row[2]) > 1 and row[2][1] == '%':
            row[1] = str(row[1] + "." + row[2])
            row.pop(2)
    for row in data:
        postgres_insert_query = """ INSERT INTO foods (id, name, kcal, protein, fat, carbs) VALUES (%s,%s,%s,%s,%s,%s)"""
        record_to_insert = (int(row[0]), row[1], int(row[2]), float(row[3]), float(row[4]), float(row[5]))
        cursor.execute(postgres_insert_query, record_to_insert)

    connection.commit()
    count = cursor.rowcount
    print(count, "Record inserted successfully into mobile table")

except (Exception, psycopg2.Error) as error:
    print("Failed to insert record into mobile table", error)

finally:
    # closing database connection.
    if connection:
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")