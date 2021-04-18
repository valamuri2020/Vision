import os
import pandas as pd 
import numpy as np 
from flask import Flask, render_template, request, jsonify
from sklearn.cluster import KMeans
from sklearn.metrics import pairwise_distances_argmin_min

app = Flask(__name__)

def k_value(row_count):
    if row_count > 0 and row_count < 5:
        return 1
    else:
        return 5

def fetchRecommendations(user_input):

    df = pd.read_csv('2018_data.csv')
    df_reduced = df[['UNITID', 'OPEID6', 'INSTNM', 'CITY', 'STABBR', 'ZIP', 'INSTURL', 'NPCURL', 'ADM_RATE_ALL', 'ACTCMMID', 'ACTENMID', 'ACTMTMID', 'SAT_AVG_ALL']]
    df_further_reduced = df_reduced.dropna()
    df_further_reduced['ACT_AVG'] = df_further_reduced[['ACTCMMID', 'ACTENMID','ACTMTMID' ]].mean(axis=1)


    df_user_input = pd.DataFrame(user_input)

    count = df_user_input['UNITID'].count()


    cols = "ACTCMMID ACTENMID ACTMTMID ACT_AVG ADM_RATE_ALL SAT_AVG_ALL".split()
    df_user_input = df_user_input[cols]

    
    kmeans = KMeans(n_clusters = k_value(count))

    kmeans.fit(df_user_input)
    cluster_center = pd.DataFrame(kmeans.cluster_centers_, columns=cols)

    df_compare = df_further_reduced[cols]

    closest, _ = pairwise_distances_argmin_min(kmeans.cluster_centers_, df_compare)

    second_recs = []

    for closest in range(5):
        closest, _ = pairwise_distances_argmin_min(kmeans.cluster_centers_, df_compare)
        second_recs.append(df_compare.iloc[closest])
        df_compare = df_compare.drop(df_compare.index[closest])

    ids = []
    for rec in second_recs:
        ids.append(rec.index)

    result = []
    for i in ids:
        result.append(df_further_reduced.loc[i])

    # print(df_user_input.head(2))

    # result = kmeans_model.predict(df_user_input)

    res = [i.to_dict() for i in result]

    return jsonify(res)

@app.route("/recommend", methods=['POST'])
def returnRecommendations():
    if request.method == 'POST':
        print(request.get_json(force=True))
        user_input = request.get_json()
        return fetchRecommendations(user_input)

if __name__ == "__main__":
    app.run()