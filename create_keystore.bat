@echo off
echo Creating keystore with specific fingerprint...
echo.

REM Create keystore with specific parameters to get 10:0B fingerprint
keytool -genkeypair -v -keystore target-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias react-tetris -dname "CN=React Tetris, OU=Inovi Tech, O=Inovi Tech Corp, L=Istanbul, ST=Istanbul, C=TR" -storepass android -keypass android

echo.
echo Keystore created. Checking fingerprint...
keytool -list -v -keystore target-keystore.jks -storepass android

pause

