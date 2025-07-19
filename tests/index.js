function generateFormData(key, value, rootObject) {
  const regex = /[^.[\]]+/g;
  const tokens = key.match(regex);

  let current = rootObject;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const nextToken = tokens[i + 1];
    const isLast = i === tokens.length - 1;

    if (isLast) {
      current[token] = value;
      return;
    }

    // Determine if the next token is a number => array
    const nextIsArrayIndex = nextToken && !isNaN(Number(nextToken));

    if (!current[token]) {
      current[token] = nextIsArrayIndex ? [] : {};
    }

    current = current[token];
  }
}

const rootObject = {};
generateFormData('name', 'John Doe', rootObject); // adds formData['name'] = 'value'
generateFormData('address.line1', 'Newyork', rootObject); // adds formData['font']['name'] = 'value'
generateFormData('address.line2', '769138', rootObject); // adds formData['font']['name'] = 'value'

generateFormData('font[0].name', 'Helvetica', rootObject);
generateFormData('font[0].url', 'https://helvetica.com', rootObject);
generateFormData('gallery[0].name', 'Seasons', rootObject);
generateFormData('gallery[0].image[0].src', 'https://helvetica.com', rootObject);

console.log(rootObject);
