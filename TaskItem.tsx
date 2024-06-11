import React from "react";
import { View, Text, TouchableOpacity, StyleSheet} from "react-native";
import { useNavigation } from "@react-navigation/native";
type Task = {
    title: string | null,
    description: string | null,
    priority: String | null,
    date: Date | null,
    time: Date | null,
    done: boolean
};

function TaskItem(props: any) {


    const naviga = useNavigation();
    const onClick = (index: number, task: Task,) => {


        (naviga as any).navigate('edit', {
            index: index,
            task: task,
            componentName:props.componentName
        })
    }


    return (

        <View style={styles.container}>
            <TouchableOpacity style={styles.indexContainer} onPress={() => props.deleteTask()}>

                <Text style={styles.circle}> </Text>

            </TouchableOpacity>
           
            
            <TouchableOpacity style={styles.taskContainer} onPress={() => onClick(props.index, props.task)}>
                <Text style={styles.task}>{props.task.title}</Text>
            </TouchableOpacity>
        </View>

    );
}





const styles = StyleSheet.create({
    CheckBox: {
        marginLeft: 16
    },

    container: {
        flexDirection: 'row',
        marginHorizontal: 20,
    },
    bc1: {
        color: "red",
        marginRight: 2,
        borderColor: "red"
    },
    indexContainer: {
        //backgroundColor: '#3E3364',
        borderRadius: 12,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 50,
    },
    index: {
        color: '#fff',
        fontSize: 20,
    },
    taskContainer: {
        backgroundColor: '#3E3364',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 7,
        paddingVertical: 5,
        minHeight: 50,
    },
    task: {
        color: '#fff',
        width: '90%',
        fontSize: 16,
        paddingLeft: 10
    },
    circle: {
        borderRadius: 12,
        width: 30,
        height: 30,
        borderColor: 'purple',
        borderWidth: 2.5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
      },


});

export default TaskItem;