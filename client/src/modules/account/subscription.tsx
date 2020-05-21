import React from 'react'
//
import { Pay } from '../stripe/pay'
import { Modal } from '../components/modal'
import { CardManageSubscription } from './manage-subscription'

interface SubscriptionDetailsProps {
  path: string
}

export function SubscriptionDetails(props: SubscriptionDetailsProps) {
  return (
    <>
      {/* <SubscriptionPaymentDetails /> */}
      {/* <Modal
        children={
          <div className="bg-white rounded p-4 modal">
            <span className="block text-center text-2xl mb-4 font-light text-gray-800">
              Select membership plan
            </span>
            <div className="w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <div className="border rounded shadow border-gray-300 p-4 w-full">
                  <span className="text-lg font-semibold block">
                    Basic Tier
                  </span>
                  <span className="text-sm text-gray-500 mb-2 block">Free</span>
                  <SubscriptionFeature />
                  <SubscriptionFeature />
                  <SubscriptionFeature />
                  <SubscriptionFeature />
                </div>
                <div className="border rounded border-gray-300 p-4 w-full">
                  <span className="text-lg font-semibold block">
                    Premium Tier
                  </span>
                  <span className="text-sm text-gray-500 mb-2 block">
                    $5 per month
                  </span>
                  <SubscriptionFeature />
                  <SubscriptionFeature />
                  <SubscriptionFeature />
                  <SubscriptionFeature />
                </div>
              </div>
            </div>
          </div>
        }
      /> */}
      <CardManageSubscription />
    </>
  )
}

function SubscriptionPaymentDetails() {
  return (
    <Modal>
      <div className="bg-white rounded p-4 modal">
        <div className="w-full">
          <div className="relative">
            <svg
              className="absolute"
              style={{ top: 7.5, left: 5 }}
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="arrow-left"
              height={17.5}
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="rgba(45, 55, 72)"
                d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"
              />
            </svg>
          </div>
          <span className="block text-center text-2xl ml-3 font-light text-gray-800">
            Provide Payment Details
          </span>
        </div>
        <div>
          <Pay />
        </div>
      </div>
    </Modal>
  )
}
