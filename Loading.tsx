import React, { useState } from "react";
import 'react-native-gesture-handler';
import { SafeAreaView, View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, TextBase, KeyboardAvoidingView, BackHandler } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
//import axios from "axios";
//import { SelectList } from 'react-native-dropdown-select-list'


function Loading(props: any) {

    const naviga = useNavigation();


    setTimeout(() => {
        (naviga as any).navigate('home', {
            update: 0
        })
    }, 1);




    return (
        <View style={styles.main}>

        </View>
    );
}


const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#1E1A3C',
    },
});

export default Loading;