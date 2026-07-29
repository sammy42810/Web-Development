/*
Using JavaScript in your browser only, you will listen for the form's submit event; when the form is submitted, you will:

Get the value of the input password element.
You will take in the password input and generate statistics based on the password.
You will calculate the following statistics based on the password:
Original Password: you will just show the input that the user entered
Length: total number of characters in the password
Uppercase Letters: total number of uppercase letters in the password
Lowercase Letters: total number of lowercase letters in the password
Digits: total number of numeric digits in the password
Special Characters: total number of characters that are not letters or digits
Unique Characters: total number of distinct characters in the password
Repeated Characters: number of distinct characters that appear more than once
Contains Sequential Letters: whether the password contains any sequence of 3 consecutive letters in ascending alphabetical order (such as abc, bcd, xyz). Case should be ignored.
Contains Sequential Numbers: whether the password contains any sequence of 3 consecutive digits in ascending order (such as 123, 456, 789)
Password Strength: based on the rules in the assignment specification

Password strength rules:
Length >= 12 -> +2
Length >= 8 and < 12 -> +1
Contains uppercase -> +1
Contains lowercase -> +1
Contains digits -> +1
Contains special characters -> +1
Contains sequential characters -> -1

IMPORTANT:
The length rules are NOT cumulative. If the password length is >= 12, it receives +2 points only, not +3.
The sequential penalty is applied only once even if both letter and number sequences exist.

You will generate the following HTML every time the application processes the password and append it to the results div.
You will be using a data list element (dl), inside the dl, you will have a data title (dt) that has the title of the stat and then a data description (dd) which has the value.

Here is the output based on the input: "P@ssword123"
<dl>

  <dt>Original Password</dt>
  <dd>P@ssword123</dd>

  <dt>Length</dt>
  <dd>11</dd>

  <dt>Uppercase Letters</dt>
  <dd>1</dd>

  <dt>Lowercase Letters</dt>
  <dd>6</dd>

  <dt>Digits</dt>
  <dd>3</dd>

  <dt>Special Characters</dt>
  <dd>1</dd>

  <dt>Unique Characters</dt>
  <dd>10</dd>

  <dt>Repeated Characters</dt>
  <dd>1</dd>

  <dt>Contains Sequential Letters</dt>
  <dd>false</dd>

  <dt>Contains Sequential Numbers</dt>
  <dd>true</dd>

  <dt>Password Strength</dt>
  <dd>Moderate</dd>

</dl>

You will generate the above HTML and append it to the div every time the form is submitted, so you will have multiple data lists (dl) in the div, one for each time the user inputs and processes a password. So for example:

If the user submitted the following input and processed it:

1. "password1"

2. "SuperSecure99!"

3. "hello123"

Your div would look like this:

<div id="results">

  <dl>

    <dt>Original Password</dt>
    <dd>password1</dd>

    <dt>Length</dt>
    <dd>9</dd>

    <dt>Uppercase Letters</dt>
    <dd>0</dd>

    <dt>Lowercase Letters</dt>
    <dd>8</dd>

    <dt>Digits</dt>
    <dd>1</dd>

    <dt>Special Characters</dt>
    <dd>0</dd>

    <dt>Unique Characters</dt>
    <dd>8</dd>

    <dt>Repeated Characters</dt>
    <dd>1</dd>

    <dt>Contains Sequential Letters</dt>
    <dd>false</dd>

    <dt>Contains Sequential Numbers</dt>
    <dd>false</dd>

    <dt>Password Strength</dt>
    <dd>Moderate</dd>

  </dl>

  <dl>

    <dt>Original Password</dt>
    <dd>SuperSecure99!</dd>

    <dt>Length</dt>
    <dd>14</dd>

    <dt>Uppercase Letters</dt>
    <dd>2</dd>

    <dt>Lowercase Letters</dt>
    <dd>9</dd>

    <dt>Digits</dt>
    <dd>2</dd>

    <dt>Special Characters</dt>
    <dd>1</dd>

    <dt>Unique Characters</dt>
    <dd>8</dd>

    <dt>Repeated Characters</dt>
    <dd>5</dd>

    <dt>Contains Sequential Letters</dt>
    <dd>false</dd>

    <dt>Contains Sequential Numbers</dt>
    <dd>false</dd>

    <dt>Password Strength</dt>
    <dd>Strong</dd>

  </dl>

  <dl>

    <dt>Original Password</dt>
    <dd>hello123</dd>

    <dt>Length</dt>
    <dd>8</dd>

    <dt>Uppercase Letters</dt>
    <dd>0</dd>

    <dt>Lowercase Letters</dt>
    <dd>5</dd>

    <dt>Digits</dt>
    <dd>3</dd>

    <dt>Special Characters</dt>
    <dd>0</dd>

    <dt>Unique Characters</dt>
    <dd>7</dd>

    <dt>Repeated Characters</dt>
    <dd>1</dd>

    <dt>Contains Sequential Letters</dt>
    <dd>false</dd>

    <dt>Contains Sequential Numbers</dt>
    <dd>true</dd>

    <dt>Password Strength</dt>
    <dd>Weak</dd>

  </dl>

</div>

If the user does not have a value for the input when they submit, you should not continue processing and instead should inform them of the error on the page. If the user enters bad data, you should not continue processing and instead inform them of the error on the page.
*/
