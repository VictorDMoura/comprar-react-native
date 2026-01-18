import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { styles } from "./styles";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";
import { Item } from "@/components/Item";
import { useState, useEffect } from "react";
import { itemsStorage, ItemStorage } from "@/storage/itemsStorage";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

export function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING);
  const [items, setItems] = useState<ItemStorage[]>([]);
  const [description, setDescription] = useState("");

  async function handleAdd() {
    if (!description.trim()) {
      return Alert.alert("Adicionar", "Informe a descrição para adicionar.");
    }
    const newItem = {
      id: new Date().getTime().toString(),
      description: description,
      status: FilterStatus.PENDING,
    };

    await itemsStorage.add(newItem);

    setFilter(FilterStatus.PENDING);
    await itemsByStatus();
    Alert.alert("Adicionar", `Adicionado ${description} com sucesso!`);
    setDescription("");
  }

  async function itemsByStatus() {
    try {
      const storedItems = await itemsStorage.getByStatus(filter);
      setItems(storedItems);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível carregar os itens.");
    }
  }

  async function handleClear() {
    try {
      await itemsStorage.clear();
      itemsByStatus();
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível limpar os itens.");
    }
  }

  useEffect(() => {
    itemsByStatus();
  }, [filter]);

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />

      <View style={styles.form}>
        <Input
          placeholder="O que você precisa comprar?"
          onChangeText={setDescription}
          value={description}
        />
        <Button title="Entrar" onPress={handleAdd} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              isActive={filter === status}
              onPress={() => setFilter(status)}
            />
          ))}

          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onStatus={() =>
                itemsStorage
                  .update({
                    ...item,
                    status:
                      item.status === FilterStatus.PENDING
                        ? FilterStatus.DONE
                        : FilterStatus.PENDING,
                  })
                  .then(() => itemsByStatus())
              }
              onRemove={() =>
                itemsStorage.remove(item.id).then(() => itemsByStatus())
              }
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <Text style={styles.empty}>Nenhum item aqui.</Text>
          )}
        />
      </View>
    </View>
  );
}
