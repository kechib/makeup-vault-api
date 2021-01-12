# REST_ID=5fc6946f036f2b5763bdaf50 sh curl-scripts/reviews/create.sh
curl 'https://hidden-spire-04826.herokuapp.com/reviews' \
  --include \
  --request POST \
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
