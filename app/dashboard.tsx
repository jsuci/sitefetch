import { ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import firestore from "@react-native-firebase/firestore";
import React, { useState } from "react";

const Dashboard = () => {
  const [todo, setTodo] = useState("");
  const ref = firestore().collection("blogposts");

  const addTodo = async () => {
    await ref.add({
      title: todo,
      complete: false,
    });
    setTodo("");
  };

  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <Text>List of TODOs!</Text>
      </ScrollView>
      <TextInput placeholder={"New Todo"} value={todo} onChangeText={setTodo} />
      <TouchableOpacity onPress={addTodo}>
        <Text>Add TODO</Text>
      </TouchableOpacity>
    </>
  );
};

export default Dashboard;
