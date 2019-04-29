import React from 'react';
import { View, Text, TextInput, Button, ScrollView, FlatList } from 'react-native';

export default class Login extends React.Component{
    render(){
        return(
            <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                <View style={{height:10, flex:1, justifyContent:"center", alignItems:"center"}}>
                    <Text>Music Map</Text>
                </View>
                <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                    <Text style={{justifyContent: 'flex-start'}}>Username:</Text>
                        <TextInput style={{borderColor: 'grey', height:20, width:100, borderWidth:1}}/>
                    <Text style={{justifyContent: 'flex-start'}}>Password:</Text>
                        <TextInput style={{borderColor: 'grey', height:20, width:100, borderWidth:1}}/>
                    <Button
                        onPress={() => {
                            alert('You tapped the button!');
                        }}
                        title="Login"
                        color="#841584"
                        accessibilityLabel="Button for login"
                    />
                </View>
            </View>

        )
    }
}