import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface PaymentPackage {
  id: string;
  name: string;
  price: number;
  period: string;
  originalPrice?: number;
  features: string[];
  popular?: boolean;
  gradient: readonly [string, string];
}

interface PaymentModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectPackage: (packageId: string) => void;
  loading?: boolean;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  visible,
  onClose,
  onSelectPackage,
  loading = false,
}) => {
  const [selectedPackage, setSelectedPackage] = useState<string>('');

  const packages: PaymentPackage[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 99000,
      period: 'tháng',
      features: ['Tạo tối đa 10 outfit', 'Lưu trữ 50 ảnh', 'Hỗ trợ cơ bản', 'Tính năng cơ bản'],
      gradient: ['#667eea', '#764ba2'],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 199000,
      period: 'tháng',
      originalPrice: 299000,
      features: [
        'Tạo không giới hạn outfit',
        'Lưu trữ không giới hạn',
        'Hỗ trợ ưu tiên',
        'Tính năng nâng cao',
        'Xuất báo cáo',
        'Đồng bộ đa thiết bị',
      ],
      popular: true,
      gradient: ['#f093fb', '#f5576c'],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 399000,
      period: 'tháng',
      originalPrice: 599000,
      features: [
        'Tất cả tính năng Premium',
        'AI tư vấn phối đồ',
        'Phân tích xu hướng',
        'Tích hợp với shop online',
        'API riêng',
        'Hỗ trợ 24/7',
      ],
      gradient: ['#4facfe', '#00f2fe'],
    },
  ];

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackage(packageId);
  };

  const handleConfirm = () => {
    if (selectedPackage) {
      onSelectPackage(selectedPackage);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalWrapper}>
          <View style={styles.modalContainer}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Chọn Gói Premium</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Nội dung */}
            <ScrollView
              style={styles.content}
              contentContainerStyle={{ paddingBottom: 120 }}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.subtitle}>
                Nâng cấp để trải nghiệm đầy đủ tính năng
              </Text>

              {packages.map((pkg) => (
                <TouchableOpacity
                  key={pkg.id}
                  style={[
                    styles.packageCard,
                    selectedPackage === pkg.id && styles.selectedCard,
                  ]}
                  onPress={() => handleSelectPackage(pkg.id)}
                  activeOpacity={0.9}
                >
                  {pkg.popular && (
                    <View style={styles.popularBadge}>
                      <Text style={styles.popularText}>Phổ biến</Text>
                    </View>
                  )}

                  <LinearGradient
                    colors={pkg.gradient}
                    style={styles.packageHeader}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={styles.packageName}>{pkg.name}</Text>
                    <View style={styles.priceContainer}>
                      <Text style={styles.price}>{formatPrice(pkg.price)}</Text>
                      <Text style={styles.period}>/{pkg.period}</Text>
                    </View>
                    {pkg.originalPrice && (
                      <Text style={styles.originalPrice}>
                        {formatPrice(pkg.originalPrice)}
                      </Text>
                    )}
                  </LinearGradient>

                  <View style={styles.featuresContainer}>
                    {pkg.features.map((feature, index) => (
                      <View key={index} style={styles.featureItem}>
                        <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>

                  {selectedPackage === pkg.id && (
                    <View style={styles.selectedIndicator}>
                      <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                    </View>
                  )}
                </TouchableOpacity>
              ))}

              <View style={styles.infoContainer}>
                <View style={styles.infoItem}>
                  <Ionicons name="shield-checkmark" size={20} color="#2196F3" />
                  <Text style={styles.infoText}>Thanh toán an toàn</Text>
                </View>
                <View style={styles.infoItem}>
                  <Ionicons name="refresh" size={20} color="#2196F3" />
                  <Text style={styles.infoText}>Hủy bất cứ lúc nào</Text>
                </View>
              </View>
            </ScrollView>

            {/* Footer cố định */}
            <View style={styles.footer}>
              <TouchableOpacity
                style={[
                  styles.confirmButton,
                  !selectedPackage && styles.disabledButton,
                ]}
                onPress={handleConfirm}
                disabled={!selectedPackage || loading}
              >
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  style={styles.confirmGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.confirmText}>
                    {loading ? 'Đang xử lý...' : 'Xác nhận thanh toán'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalWrapper: {
    height: 600,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  modalContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  content: {
    paddingHorizontal: 20,
  },
  subtitle: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#666',
  },
  packageCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#eee',
    overflow: 'hidden',
    position: 'relative',
  },
  selectedCard: {
    borderColor: '#667eea',
  },
  popularBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    zIndex: 2,
  },
  popularText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  packageHeader: {
    padding: 16,
    alignItems: 'center',
  },
  packageName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 6,
  },
  price: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
  },
  period: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 4,
  },
  originalPrice: {
    fontSize: 14,
    color: '#fff',
    textDecorationLine: 'line-through',
    marginTop: 4,
  },
  featuresContainer: {
    padding: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 2,
  },
  infoContainer: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 10,
    color: '#666',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  confirmButton: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  disabledButton: {
    opacity: 0.6,
  },
  confirmGradient: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PaymentModal;
