// src/app/orders/page.js
"use client";

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--main-bg-color);
  color: var(--main-text-color);
  position: relative;
`;

const Content = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  z-index: 2;
`;

const OrdersContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  width: 100%;
  min-height: 80vh;
  position: relative;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
`;

const Thead = styled.thead`
  background-color: #f9f9f9;
`;

const Tbody = styled.tbody`
  background-color: #fff;
`;

const Th = styled.th`
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #ddd;
`;

const StatusBadge = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 5px;
  color: #fff;
  background-color: ${({ status }) =>
    status === 'Completed'
      ? 'green'
      : status === 'Cancelled'
        ? 'red'
        : 'yellow'};
  color: ${({ status }) =>
    status === 'Completed'
      ? '#fff'
      : status === 'Cancelled'
        ? '#fff'
        : '#000'};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #ccc;
  position: absolute;
  bottom: 1rem;
  left: 2rem;
  right: 2rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  background-color: #28a745;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const ImageContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 66.6%;
  height: 100%;
  background-color: #addfad;
  display: flex;
  justify-content: center;
  align-items: center;
  clip-path: polygon(
    36% 0, 100% 0, 100% 35%, 100% 70%, 100% 100%, 19% 100%, 7% 90%, 2% 58%, 10% 35%, 23% 22%
  );
  z-index: 1;
`;

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:7000/orderhistory", {
          method: "GET",
          credentials: 'include', // Ensure cookies are included in the request
        });
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error('Error fetching order history:', err);
      }
    };

    fetchOrders();
  }, []);

  // Calculate pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <MainContainer>
      <Navbar />
      <Content>
        <OrdersContainer>
          <Title>Your Orders</Title>
          <Table>
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Order ID</Th>
                <Th>Order</Th>
                <Th>Date Ordered</Th>
                <Th>Paid</Th>
                <Th>Order Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentOrders.map((order, index) => (
                <Tr key={order.id}>
                  <Td>{indexOfFirstOrder + index + 1}</Td>
                  <Td>{order.orderId}</Td>
                  <Td>{order.order}</Td>
                  <Td>{order.dateOrdered}</Td>
                  <Td>{order.paid}</Td>
                  <Td>
                    <StatusBadge status={order.status}>{order.status}</StatusBadge>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Pagination>
            <span>Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, orders.length)} of {orders.length} records</span>
            <div>
              <PageButton
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lt;
              </PageButton>
              {[...Array(totalPages)].map((_, index) => (
                <PageButton
                  key={index}
                  onClick={() => paginate(index + 1)}
                  disabled={currentPage === index + 1}
                >
                  {index + 1}
                </PageButton>
              ))}
              <PageButton
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages || orders.length <= ordersPerPage}
              >
                &gt;
              </PageButton>
            </div>
          </Pagination>
        </OrdersContainer>
        <ImageContainer style={{ zIndex: -1 }} />
      </Content>
    </MainContainer>
  );
};

export default OrdersPage;
