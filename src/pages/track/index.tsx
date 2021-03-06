import React, { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { useMoralis } from 'react-moralis';
import ContentWrapper from '../../components/contentWrapper';
import SubmitButton from '../../components/form/submit-button';
import Form from '../../components/form/form';
import Input from '../../components/form/input';

const TrackWalletsPage = () => {
  const { Moralis } = useMoralis();
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [chatId, setChatId] = useState('');
  const [success, setSuccess] = useState('hidden');
  // const [telegram, setTelegram] = useState(false);
  // const [email, setEmail] = useState(false);
  // const [twitter, setTwitter] = useState(false);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const { value } = e.target;
    const { name: inputName } = e.target;

    if (inputName === 'address') {
      setAddress(value);
    } else if (inputName === 'name') {
      setName(value);
    } else if (inputName === 'chatId') {
      setChatId(value);
    }
    // else if (name === 'telegram') {
    //   setTelegram(!telegram);
    // } else if (name === 'email') {
    //   setEmail(!email);
    // } else if (name === 'twitter') {
    //   setTwitter(!twitter);
    // }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    try {
      // const telegramAlert = telegram && 'telegram';
      // const emailAlert = email && 'email';
      // const twitterAlert = twitter && 'twitter';
      // const alertMethods = [telegramAlert, emailAlert, twitterAlert].filter(
      //   (alert) => alert !== false
      // );

      const params = { address: address.toLowerCase(), name, chatId };
      await Moralis.Cloud.run('watchAddress', params);
      setAddress('');
      setName('');
      setChatId('');
      setSuccess('block');
      setTimeout(() => setSuccess('hidden'), 5000);
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  };

  const disabled = !name || !address || address.length !== 42 || chatId.length !== 14;

  return (
    <ContentWrapper>
      <Form title="Track Wallet" titleColour="text-white" handleSubmit={handleSubmit}>
        <Input
          type="text"
          name="address"
          placeholder="ETH Address"
          handleChange={handleChange}
          minLength={42}
          value={address}
        />
        <Input
          type="text"
          name="name"
          placeholder="Wallet Name"
          handleChange={handleChange}
          minLength={1}
          value={name}
        />
        <Input
          type="text"
          name="chatId"
          placeholder="Telegram Chat ID"
          handleChange={handleChange}
          minLength={14}
          value={chatId}
        />
        {/* <div className="flex mt-3">
          <div className="mr-5 text-gray-400">
            <Input
              type="checkBox"
              name="telegram"
              handleChange={handleChange}
              value={telegram}
            />{' '}
            Telegram
          </div>
          {/* <div className="mr-5 text-gray-400">
            <Input
              type="checkBox"
              name="email"
              handleChange={handleChange}
              value={email}
            />{' '}
            Email
          </div>
          <div className="mr-5 text-gray-400">
            <Input
              type="checkBox"
              name="twitter"
              handleChange={handleChange}
              value={twitter}
            />{' '}
            Twitter
          </div> */}
        {/* </div> */}
        <button type="button" className="text-blue-500 w-fit mb-3 ">
          <FaInfoCircle className="inline mr-2" />
          Follow these instructions to get your Telegram chat ID
        </button>
        <div className="flex justify-center">
          <div
            className={`bg-green-500 w-1/3 rounded-md p-2 text-center text-black font-semibold ${success}`}>
            Wallet Tracked!
          </div>
        </div>
        <SubmitButton disabled={disabled} action="Track" />
      </Form>
    </ContentWrapper>
  );
};

export default TrackWalletsPage;
