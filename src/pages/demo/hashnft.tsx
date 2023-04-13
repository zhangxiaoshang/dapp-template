import Button from "@mui/material/Button";

import { useAccount } from "wagmi";
import { useIsMounted } from "@/hooks/use-is-mounted";
import {
  useHashNftv2Name,
  useHashNftv2BalanceOf,
  useHashNftv2Mint,
  usePrepareHashNftv2Mint,
} from "@/generated";
import { useEffect } from "react";

const hashNFTAddress = process.env
  .NEXT_PUBLIC_HASHNFTV2_ADDRESS as `0x[string]`;

export default function HashNFT() {
  const account = useAccount();
  const mounted = useIsMounted();

  const nameRet = useHashNftv2Name({
    address: hashNFTAddress,
  });
  const accountBalance = useHashNftv2BalanceOf({
    address: hashNFTAddress,
    args: account.address ? [account.address] : undefined,
  });

  const { config } = usePrepareHashNftv2Mint({
    address: hashNFTAddress,
    args: account.address ? [account.address] : undefined,
  });
  const { write, status: mintStatus } = useHashNftv2Mint({
    ...config,
    onSuccess(data) {
      accountBalance.refetch();
    },
  });

  const handleMint = () => {
    if (!write) {
      return alert("no write");
    }

    write();
  };

  if (!mounted) return null;

  return (
    <div>
      <h1 className="text-center">Hash NFT</h1>

      <p>account: {account.address}</p>
      <p>balance: {accountBalance.data?.toString()}</p>
      <p>name: {nameRet?.data}</p>
      <div>
        <Button
          variant="contained"
          onClick={handleMint}
          disabled={mintStatus === "loading"}
        >
          {mintStatus === "idle" || mintStatus === "success"
            ? "Mint"
            : mintStatus}
        </Button>
      </div>
    </div>
  );
}
