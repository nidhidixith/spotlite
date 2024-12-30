import requests

def send_push_notification(expo_token, title, body, data=None):
    url = 'https://exp.host/--/api/v2/push/send'
    payload = {
        'to': expo_token,
        'title': title,
        'body': body,
        'data': data or {},
    }
    headers = {
        'Content-Type': 'application/json',
    }

    response = requests.post(url, json=payload, headers=headers)
    return response.json()
