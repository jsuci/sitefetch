import { ScrollView, Text } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { Appbar, TextInput, Button } from "react-native-paper";
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
      <Appbar>
        <Appbar.Content title={"TODOs List"} />
      </Appbar>
      <ScrollView style={{ flex: 1 }}>
        <Text>List of TODOs!</Text>
      </ScrollView>
      <TextInput label={"New Todo"} value={todo} onChangeText={setTodo} />
      <Button onPress={addTodo}>Add TODO</Button>
    </>
  );
};

export default Dashboard;
