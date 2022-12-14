import chai, { expect } from 'chai'
import { ethers } from 'hardhat'
import { solidity } from 'ethereum-waffle'

import { ETHProtocolFeesDistributor } from '../typechain/ETHProtocolFeesDistributor'
import { ERC20Token } from '../typechain/ERC20Token'
import exp from 'constants'

chai.use(solidity)

let protocolFeesDistributor: ETHProtocolFeesDistributor
let token: ERC20Token

const BALANCER_FEE_COLLECTOR = '0xce88686553686DA562CE7Cea497CE749DA109f9F'
const XAVE_FEES_COLLECTOR = '0xA670629924234B5427dB9B7e0BC52C0f19a81E6d'

const TOKENS_HELD_IN_PROTOCOL_FEES_DISTRIBUTER = ethers.utils.parseEther('100')
const FITY_PERCENT = ethers.utils.parseEther('50')
const ZERO = ethers.utils.parseEther('0')

describe('Ethereum Protocol Fees Distributor', () => {
  before(async () => {
    const ProtocolFeesDistributorFactory = await ethers.getContractFactory('ETHProtocolFeesDistributor')
    protocolFeesDistributor = (await ProtocolFeesDistributorFactory.deploy()) as ETHProtocolFeesDistributor
    await protocolFeesDistributor.deployed()
    console.log(`Protocol Fees Distributor deployed at ${protocolFeesDistributor.address}`)
  })

  before('Simulate FX Pool redirecting collected trading fees to Protocol Fees Distributor contract', async () => {
    const TokenFactory = await ethers.getContractFactory('ERC20Token')
    token = (await TokenFactory.deploy('XSGD (PoS)', 'XSGD')) as ERC20Token
    await token.deployed()
  })

  it('should not disperse when Protocol Fees Distributor has zero balance of provided token', async () => {
    expect(protocolFeesDistributor.disperseFees(token.address)).to.be.revertedWith(
      'Contract has zero balance for specified token'
    )
  })

  it('should disperse fees amounting 50% to Balancer Fees Collector and 50% to Xave Treasury', async () => {
    await token.mint(protocolFeesDistributor.address, TOKENS_HELD_IN_PROTOCOL_FEES_DISTRIBUTER)

    expect(await token.balanceOf(BALANCER_FEE_COLLECTOR)).to.equal(ZERO)
    expect(await token.balanceOf(XAVE_FEES_COLLECTOR)).to.equal(ZERO)
    expect(await token.balanceOf(protocolFeesDistributor.address)).to.equal(TOKENS_HELD_IN_PROTOCOL_FEES_DISTRIBUTER)

    expect(protocolFeesDistributor.disperseFees(token.address))
      .to.emit(protocolFeesDistributor, 'FeesCollected')
      .withArgs(FITY_PERCENT, FITY_PERCENT)

    expect(await token.balanceOf(BALANCER_FEE_COLLECTOR)).to.equal(FITY_PERCENT)
    expect(await token.balanceOf(XAVE_FEES_COLLECTOR)).to.equal(FITY_PERCENT)
    expect(await token.balanceOf(protocolFeesDistributor.address)).to.equal(ZERO)
  })
})
