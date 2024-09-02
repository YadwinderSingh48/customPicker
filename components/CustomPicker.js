import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.1;
const CustomPicker = ({ data, selectedItemTextColor }) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(Math.floor(data.length / 2));

  // Function that runs when the scrolling stops
  const onScrollEnd = (event) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const itemHeight = height * 0.1; // The height of each item
    console.log(contentOffsetY,itemHeight)
    const index = Math.round(contentOffsetY / itemHeight); // Calculate the center item index
    console.log(index)

    setSelectedItemIndex(index); // Update the selected item index
  };

  // Function to render each item in the picker
  const renderItem = ({ item, index }) => {
    const isSelected = index === selectedItemIndex; // Check if the item is centered
    return (
      <View style={styles.itemContainer}>
        <Text
          style={[
            styles.itemText,
            isSelected && { color: selectedItemTextColor }, // Apply the text color if selected
          ]}
        >
          {item}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ height: height * 0.3, backgroundColor:'white' }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
        snapToInterval={height * 0.1} // Ensures that the list stops at each item precisely
        decelerationRate="fast" // Makes the scrolling smoother
        // snapToAlignment="center" // Aligns the items to the center
        onScroll={onScrollEnd} // Triggers the onScrollEnd function after scrolling stops
        // scrollEventThrottle={16} // Ensures more frequent updates
        // contentContainerStyle={{paddingVertical:ITEM_HEIGHT}}
        ListHeaderComponent={<View style={{ height: ITEM_HEIGHT }} />}
        ListFooterComponent={<View style={{ height: ITEM_HEIGHT }} />}
      />
      {/* The centered background view */}
      <View style={styles.centerHighlight}>
        <View style={{width:'90%',height:'90%',backgroundColor:'green', borderWidth:1,borderRadius:16,borderColor:'lightgreen'}}></View>
      </View>
    </View>
  );
};

const App = () => {
  const years = Array.from({ length: 100 }, (_, i) => 1920 + i);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      <View style={styles.pickerWrapper}>
        <CustomPicker data={years} selectedItemTextColor="white" />
      </View>
      <View style={styles.pickerWrapper}>
        <CustomPicker data={months} selectedItemTextColor="white" />
      </View>
      <View style={styles.pickerWrapper}>
        <CustomPicker data={days} selectedItemTextColor="white" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // flex: 1,
    margin:40,
    backgroundColor:'white'
  },
  pickerWrapper: {
    width: '30%',
  },
  itemContainer: {
    height: height * 0.1, // Adjust height for each item
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Make background transparent
    // zIndex:1,
    // position:'relative'
  },
  itemText: {
    fontSize: 20,
    color:'black'
  },
  centerHighlight: {
    position: 'absolute',
    top: height * 0.1 * 1.1,
    left: 0,
    right: 0,
    height: height * 0.08,
    // backgroundColor: 'red', // Background color for the center item
    zIndex: -1, // Ensure it's behind the text
    // marginBottom:10,
    // marginTop:10
    borderTopWidth:1,
    borderBottomWidth:1,
    alignItems:'center',
    justifyContent:'center',
    borderColor:'red'
  },
});

export default App;
