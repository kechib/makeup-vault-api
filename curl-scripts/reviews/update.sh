curl "https://hidden-spire-04826.herokuapp.com/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "review": {
      "title": "'"${TITLE}"'",
      "description": "'"${DESCRIPTION}"'",
      "product": "'"${PRODUCT}"'",
      "company": "'"${COMPANY}"'",
      "rating": "'"${RATING}"'",
      "recommend": "'"${RECOMMEND}"'"
    }
  }'
  echo
