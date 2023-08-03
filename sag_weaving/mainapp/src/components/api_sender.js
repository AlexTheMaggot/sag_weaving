export default async function api_sender(method, id, params=undefined) {
    let data = {
        'jsonrpc': '2.0',
        'method': method,
        'id': id,
    }
    if (params !== undefined) {
        data['params'] = params
    }

    let response = await fetch('/api/', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
    return await response.json()
}