module.exports = [
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": "Thank You for acknowledgment. Please click Questionare button"
        }
    },
    {
        "type": "actions",
        "elements": [
            {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "Questionare",
                    "emoji": true
                },
                "style": "primary",
                "value": "submit_questionare",
                "action_id": "questionare"
            }
        ]
    }
]