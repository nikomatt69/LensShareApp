
# LensShare

![icon](https://user-images.githubusercontent.com/94803063/221370747-a450cbdd-ed7c-4467-875d-030c3c9c3b4d.png)


A decentralised video sharing social platform built on Lens Protocol. 
With LensShare, users can share and discover short videos through live streaming, uploads, and social shares. (TL:DR a decentralised TikTok)



For the best experience view on web (although mobile works too just not as much, autoplay not compatible on iOS, although android should be fine.)

## Summary

LensShare is a platform that allows users to share videos with the Lens community and more. You do not need to be logged in to view and enjoy the videos. But once logged in with Lens you can post and share short videos and interact with other users videos.

LensShare offers a variety of features, including the ability to upload videos via bundlr & arweave, live streaming with Livepeer, and the option to interact with other users through comments, likes, and collects all through Lens protocol. Users can also search for and follow other profiles, and view their followers and videos.

## Table of Contents

  * [Overview](#overview)
  * [Features Summary](#features-summary)
  * [Stack](#stack)
  * [Setup](#setup)
  * [Conclusion](#conclusion)
  * [Credits](#credits)

## Stack
- Nextjs
- Tailwind CSS
- Lens Protocol
- Polygon Mumbai
- Bundlr
- Arweave
- Lit Protocol
- Livepeer
- Xmtp
- 

## Setup

```git clone git@github.com:LensShare/LensShare.git
cd LensShare
npm install
# generate lens types
npm run codegen
# create your env variables
cp .env.example .env
# Copy your Infura Api key in the .env file
# NEXT_PUBLIC_INFURA_ID=<yourInfuraKeyHere>
npm run dev
```

## Conclusion
Our aim when building LensShare was to try and make a contribution to a more decentralised social media, where users don’t have to worry about their data, and where they have full control over their content. 

LensShare is built on chain and so is by nature decentralised, it uses decentralised protocols such as Lens and Livepeer. This means greater privacy and security for users, as their data is not stored on a central server that could be vulnerable to hacking or other security threats.

In addition to the core social features, LensShare also includes the Lens collect module. This feature allows users to take more control over their content.
Comments, encrypted with Lit Protocol give further user control on both the creator and user side. 

## Credits
LensShare was created by @Nikoemme @N44TS, @driespindola, @PaoloCalzone# LensShare
