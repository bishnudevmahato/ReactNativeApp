To create app to run the project step by step
# Create project
npx @react-native-community/cli init WorkingMiniEcommerceApp
cd WorkingMiniEcommerceApp

# install node version
npm install

# install required dependicies
npm install @react-navigation/native-stack

npm install @react-navigation/native @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated

npm install @react-native-async-storage/async-storage


# Check device
adb devices

# Run the project
npx react-native run-android   // Android

npx react-native run-ios       // IOS

npm react-native start         // Web



## 📲 Download the App

[Download APK](https://github.com/bishnudevmahato/ReactNativeApp/releases/download/v1.0.0/app-release.apk)