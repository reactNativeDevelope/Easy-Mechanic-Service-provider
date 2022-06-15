import React from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import styles from './styles';
import {hideErrorModal} from './action';
import {colors, validationStings} from '../../utils';

class LoadingView extends React.PureComponent {
  hideErrorModal = () => {
    const {hideErrorModalView} = this.props;
    hideErrorModalView();
  };

  render() {
    const {loading, isError, errorMessage} = this.props;

    return (
      <View style={styles.parentContainer}>
        <Modal animationIn="fadeIn" isVisible={loading}>
          <View style={styles.container}>
            <View style={{marginLeft: 30}}>
              <ActivityIndicator color={colors.black} size="large" />
            </View>
            <View style={{width: 210, paddingLeft: 20}}>
              <Text style={{color: '#000000', fontSize: 16}}>
                {validationStings.loadingText}
              </Text>
            </View>
          </View>
        </Modal>
        {isError && (
          <View
            style={[
              styles.errorParentView,
              {backgroundColor: isError ? 'rgba(0, 0, 0, 0.4)' : 'transparent'},
            ]}>
            <View style={styles.errorContainer}>
              <Text style={styles.errorTitle}>Error</Text>
              <Text style={styles.errorText}>{errorMessage}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={this.hideErrorModal}>
                <Text style={styles.buttonText}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}
const mapStateToProps = state => ({
  loading: state.loadingReducer.loading,
  isError: state.loadingReducer.isError,
  errorMessage: state.loadingReducer.errorMessage,
});
const mapDispatchToProps = dispatch => ({
  hideErrorModalView: () => dispatch(hideErrorModal()),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoadingView);
