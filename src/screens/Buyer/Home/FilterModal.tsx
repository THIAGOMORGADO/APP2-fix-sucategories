import React from 'react';
import {
  View,
  Text,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';

import {
  COLORS,
  FONTS,
  SIZES,
  constants,
  icons,
} from '../../../constants';
import {
  IconButton,
  TwoPointSlider,
  TextButton,
} from '../../../components';

const Section = ({ containerStyle, title, children }) => {
  return (
    <View
      style={{
        marginTop: SIZES.padding,
        ...containerStyle,
      }}
    >
      <Text style={{ ...FONTS.h3 }}>{title}</Text>

      {children}
    </View>
  );
};
const FilterModal = ({ isVisible, onClose }) => {
  const [showFilterModal, setShowFilterModal] =
    React.useState(isVisible);
  const [deliveryTime, setDeliveryTime] = React.useState('');
  const [rattings, setRattings] = React.useState('');
  const [tags, setTags] = React.useState('');
  const modalAnimatedValue = React.useRef(
    new Animated.Value(0)
  ).current;

  React.useEffect(() => {
    if (showFilterModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [showFilterModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 600],
  });

  function renderDistance() {
    return (
      <Section title="Distância">
        <View style={{ alignItems: 'center' }}>
          <TwoPointSlider
            values={[3, 10]}
            min={1}
            max={20}
            postfix="km"
            onValuesChange={(values) => {
              console.log(values);
            }}
          />
        </View>
      </Section>
    );
  }

  function renderDeliveryTime() {
    return (
      <Section
        title="Delivery Time"
        containerStyle={{
          marginTop: 40,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          {constants.delivery_time.map((item, index) => {
            return (
              <TextButton
                key={`delivery_time-${index}`}
                label={item.label}
                labelStyle={{
                  color:
                    item.id == deliveryTime
                      ? COLORS.white
                      : COLORS.gray,
                  ...FONTS.body3,
                }}
                buttonContainerStyle={{
                  width: '30%',
                  height: 50,
                  margin: 5,
                  alignItems: 'center',
                  borderRadius: SIZES.base,
                  backgroundColor:
                    item.id == deliveryTime
                      ? COLORS.primary
                      : COLORS.lightGray2,
                }}
                onPress={() => {
                  setDeliveryTime(item.id);
                }}
              />
            );
          })}
        </View>
      </Section>
    );
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.transparentBlack7,
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setShowFilterModal(true);
          }}
        >
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          ></View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: 'absolute',
            top: modalY,
            left: 0,
            width: '100%',
            height: '100%',
            padding: SIZES.padding,
            borderTopRightRadius: SIZES.padding,
            borderTopLeftRadius: SIZES.padding,
            backgroundColor: COLORS.white,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text style={{ flex: 1, ...FONTS.h3, fontSize: 18 }}>
              Filtra a sua pesquisa
            </Text>

            <IconButton
              containerStyle={{
                borderWidth: 2,
                borderRadius: 10,
                borderColor: COLORS.gray2,
              }}
              icon={icons.cross}
              iconStyle={{
                tintColor: COLORS.gray2,
              }}
              onPress={() => {
                setShowFilterModal(false);
              }}
            />
          </View>
          <ScrollView
            showsVerticalScrollIndicator
            contentContainerStyle={{
              paddingBottom: 250,
            }}
          >
            {renderDistance()}
            {/* renderDeliveryTime() */}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FilterModal;
