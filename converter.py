from sqlalchemy import create_engine
import pandas as pd
xls_file = "tab2.xls"
df = pd.read_excel(xls_file, skiprows=3, usecols=[0, 2, 5, 7, 10, 11])
csv_file = "tab2.csv"
df.to_csv(csv_file, index=False, encoding='UTF-8-sig')