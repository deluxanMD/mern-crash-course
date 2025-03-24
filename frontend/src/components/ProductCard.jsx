import React, { useState } from 'react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useProductStore } from '../store/product'

const ProductCard = ({ product }) => {
  const toast = useToast()
  const { updateProduct, deleteProduct } = useProductStore()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [updatedProduct, setUpdatedProduct] = useState(product)

  const textColor = useColorModeValue('gray.600', 'gray.200')
  const bgColor = useColorModeValue('white', 'gray.800')

  const handleUpdate = async () => {
    const { success, message } = await updateProduct(
      product._id,
      updatedProduct
    )
    onClose()
    if (!success) {
      toast({
        status: 'error',
        title: 'Error',
        description: message,
        isClosable: true,
      })
    } else {
      toast({
        status: 'success',
        title: 'Success',
        description: 'Product updated successfully',
        isClosable: true,
      })
    }
  }

  const handleDelete = async () => {
    const { success, message } = await deleteProduct(product._id)

    if (!success) {
      toast({
        status: 'error',
        title: 'Error',
        description: message,
        isClosable: true,
      })
    } else {
      toast({
        status: 'success',
        title: 'Success',
        description: message,
        isClosable: true,
      })
    }
  }

  return (
    <Box
      shadow={'lg'}
      rounded={'lg'}
      overflow={'hidden'}
      transition={'all 0.3s'}
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
      bg={bgColor}
    >
      <Image
        src={product.image}
        alt={product.name}
        w={'full'}
        h={48}
        objectFit={'cover'}
      />

      <Box p={4}>
        <Heading as={'h3'} size={'md'} mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight={'bold'} fontSize={'xl'} color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} colorScheme="blue" onClick={onOpen} />
          <IconButton
            icon={<DeleteIcon />}
            colorScheme="red"
            onClick={handleDelete}
          />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                name="name"
                placeholder="Product Name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                name="price"
                placeholder="Price"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                name="image"
                placeholder="Image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={'blue'} mr={3} onClick={handleUpdate}>
              Update
            </Button>
            <Button variant={'ghost'} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default ProductCard
