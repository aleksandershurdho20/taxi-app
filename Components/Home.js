import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity } from 'react-native';
export default function Home (){
    return(
        <View>
            <Text style={styles.Title}>Merr Taxi</Text>
            <TouchableOpacity  style={styles.ButtonDanger}>
                <Text style={styles.buttonText}>I zene</Text>


            </TouchableOpacity >
            <TouchableOpacity style={styles.ButtonSuccess}>
                <Text style={styles.buttonText}>I Lire</Text>

            </TouchableOpacity>
        </View>
    )
}

const styles=StyleSheet.create({
        ButtonDanger:{
       borderRadius:8,
       paddingVertical:14,
       paddingHorizontal:10,
       backgroundColor:'red'
    },
    buttonText:{
        color:'#fff',
        fontWeight:'bold',
        textTransform:'uppercase',
        fontSize:16,
        textAlign:'center'
    },
    Title:{
        textAlign:'center',
        marginBottom:10,
        fontSize:15

    },
    ButtonStatusFree:{
        borderRadius:8,
        paddingVertical:14,
        paddingHorizontal:10,
        backgroundColor:'red',
        marginBottom:10
     },

     ButtonSuccess:{
        borderRadius:8,
        paddingVertical:14,
        paddingHorizontal:10,
        backgroundColor:'green',
        marginTop:10
     },
     
})