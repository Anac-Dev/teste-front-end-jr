import React, { useEffect, useState } from 'react';
import { Modal } from '../Modals';

interface Product {
    productName: string;
    photo: string;
    price: number;
    descriptionShort: string;
}

interface AnswerData {
    success: boolean;
    products: Product[];
}

export interface ModalProps {
    productName: string;
    photo: string;
    price: number;
    descriptionShort: string;
}

export function Cards() {
    const [data, setData] = useState<AnswerData | null>(null);
    const [dataModal, setDataModal] = useState<ModalProps | null>(null);
    const [countSlide, setCountSlide] = useState<number>(0);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result: AnswerData = await response.json();
                console.log('Fetched products:', result); // Log para verificar a resposta da API
                setData(result);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        }

        fetchProducts();
    }, []);

    const nextSlide = () => {
        if (data) {
            setCountSlide((prevCount) => (prevCount === data.products.length - 4 ? 0 : prevCount + 1));
        }
    };

    const prevSlide = () => {
        setCountSlide((prevCount) => (prevCount <= 0 ? 0 : prevCount - 1));
    };

    const openModal = (item: ModalProps) => {
        setDataModal(item);
    };

    const closeModal = () => {
        setDataModal(null);
    };

    return (
        <section className="cards-items">
            {dataModal && <Modal dataModal={dataModal} CloseModal={closeModal} />}

            <div className="slide-cards-buttons">
                <button className="left" onClick={prevSlide}>
                    <img src="assets/ArrowLeft.svg" alt="Ícone Esquerda" />
                </button>
                <button className="right" onClick={nextSlide}>
                    <img src="assets/ArrowRight.svg" alt="Ícone Direita" />
                </button>
            </div>

            <div className="container-slide">
                <div
                    className="container-slide-cards"
                    style={{
                        left: `-${countSlide * 330}px`,
                        width: `calc(330px * ${data?.products.length || 0})`,
                    }}
                >
                    {data?.products.map((item, key) => (
                        <article key={key}>
                            <img src={item.photo} alt={`Imagem do produto ${item.productName}`} />

                            <p>{item.descriptionShort}</p>

                            <span className="fake-price">
                                {(item.price + 197).toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                })}
                            </span>

                            <span className="price">
                                {item.price.toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                })}
                            </span>

                            <span className="split-price">
                                ou 2x de
                                {(item.price / 2).toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                })}
                                sem juros
                            </span>

                            <span className="freight">Frete grátis</span>

                            <button onClick={() => openModal(item)}>COMPRAR</button>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
