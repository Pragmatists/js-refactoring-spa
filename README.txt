Jeśli link z gitlab nie działa zamieniamy go na :
https://my_gitlab_user@gitlab.com/my_gitlab_user/myrepo.git


Start projektu

npm install - zaciąga zależności npm i bower
npm install -g gulp - instaluje globalnie gulpa
npm install gulp - instaluje lokalnie gulpa

Zaciągniecie bibliotek
potrzebne biblioteki dołączamy do pliku bower.json, a następnie w gulpfile.js dodajemy odpowiednie scieżki do listy libJS
zaciąga je proces gulp libs

Stawianie serwera - polecenie buduje projekti odpala serwer
gulp serve

Budowanie projektu bez startowania serwera
gulp build