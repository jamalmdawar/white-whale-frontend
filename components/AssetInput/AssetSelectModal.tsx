import React, { useState } from 'react'
import { Modal, ModalBody, ModalHeader, ModalOverlay, ModalContent, useDisclosure, HStack, VStack } from '@chakra-ui/react'
import SearchInput from './SearchInput'
import AssetList from './AssetList'
import { FC, ReactNode } from 'react'
import useAsset , {Asset} from '../../hooks/useAsset';


interface AssetSelectModalProps {
    children: ReactNode,
    currentToken: string,
    onChange: (asset: Asset) => void,
    disabled: boolean
}

const AssetSelectModal: FC<AssetSelectModalProps> = ({ children, onChange, currentToken = "" , disabled}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [search, setSearch] = useState<string>('')
    const assets =  useAsset({
        skip : currentToken
    })

    const onAssetChange = (asset) => {
        setSearch(asset?.asset)
        onChange(asset)
        onClose()
    }

    return (
        <>

            <HStack
                tabIndex={0}
                role='button'
                onClick={() => !disabled && onOpen()}
                justifyContent="end"
                width="fit-content"
            >
                {children}
            </HStack>

            <Modal onClose={onClose} isOpen={isOpen} isCentered >
                <ModalOverlay />
                <ModalContent minWidth="600px" backgroundColor="#212121">
                    <ModalHeader>Select token</ModalHeader>
                    <ModalBody
                        as={VStack}
                        gap={3}
                        paddingX="unset"
                        alignItems="flex-start"
                    >
                        <SearchInput onChange={setSearch} />
                        <AssetList 
                            assetList={assets} 
                            onChange={onAssetChange} 
                            search={search} 
                            currentToken={currentToken} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>

    )
}

export default AssetSelectModal