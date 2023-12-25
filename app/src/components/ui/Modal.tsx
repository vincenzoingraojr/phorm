import { FunctionComponent } from "react";
import { Modal, View } from "react-native";
import { globalStyles } from "../../constants/global";
import { theme } from "../../constants/theme";

interface ModalComponentProps {
    isVisible: boolean;
    children: JSX.Element;
    onClose: () => void;
}

const ModalComponent: FunctionComponent<ModalComponentProps> = ({ isVisible, children, onClose }) => {
    const styles = theme();

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible} onDismiss={onClose}>
            <View style={[globalStyles.modalContent, styles.contentContainer]}>
                {children}
            </View>
        </Modal>
    );
}

export default ModalComponent;