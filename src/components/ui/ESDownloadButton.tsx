"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { DownloadIcon, Cross2Icon } from "@radix-ui/react-icons";
import { client } from "@/lib/client"; // APIクライアント
import styles from "@/styles/ESDownloadButton.module.css";

type MainContent = {
    id: string;
    title: string;
    category_1: string[];
    category_2: string[];
    contents: string;
};

const ESDownloadButton = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [showDownloadPage, setShowDownloadPage] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [filteredContent, setFilteredContent] = useState<MainContent | null>(null);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await client.get({
                    endpoint: "main",
                    queries: {
                        limit: 20,
                    },
                });

                const filtered = response.contents
                    .map((item: MainContent) => ({
                        id: item.id,
                        title: item.title,
                        category_1: item.category_1,
                        category_2: item.category_2,
                        contents: item.contents,
                    }))
                    .find(
                        (item: MainContent) =>
                            item.title.includes("ファイル埋め込み") &&
                            item.category_1.includes("セカンドトップ") &&
                            item.category_2.includes("入ゼミ")
                    );

                setFilteredContent(filtered || null);
            } catch (error) {
                console.error("Error fetching content:", error);
            }
        };

        fetchContent();
    }, []);

    const handleDownloadClick = () => {
        setIsPopupVisible(true);
    };

    const handleClosePopup = () => {
        setIsPopupVisible(false);
        setShowDownloadPage(false);
        setAgreed(false);
    };

    const handleAgreementChange = (checked: boolean) => {
        setAgreed(checked);
    };

    const handleProceedToDownload = () => {
        if (agreed) {
            setShowDownloadPage(true);
        }
    };

    return (
        <div className={styles.container}>
            {/* ダウンロードボタン */}
            <button onClick={handleDownloadClick} className={styles.mainButton}>
                独自ESをダウンロード
            </button>

            {/* ポップアップ */}
            {isPopupVisible && (
                <div className={styles.popupOverlay}>
                    <Card className={styles.card}>
                        <button
                            onClick={handleClosePopup}
                            className={styles.closeButton}
                        >
                            <Cross2Icon style={{ width: "18px", height: "18px" }} />
                        </button>

                        {!showDownloadPage ? (
                            <div className={styles.contentContainer}>
                                <div className={styles.content}>
                                    <h2 style={{ fontWeight: "bold" }}>
                                        山本勲研究会への出願にあたって理解してほしいこと
                                    </h2>
                                    <ScrollArea className={styles.scrollArea}>
                                        <br />
                                        <p>
                                            山本勲研究会では、ゼミ員同士がグループワークで協力して学びを深めるとともに、
                                            ３年次はグループで取り組む三田祭論文の執筆・プレゼン、４年次は個人あるいは２人で取り組む
                                            卒論の執筆・プレゼンをゴールに据えた総合的なカリキュラムを準備しています。
                                        </p>
                                        <br />
                                        <p>
                                            そうしたカリキュラムを通じてゼミ員が成長する際に、特に重要になるのが、３年次の三田祭論文への取り組みになります。
                                            就活などの他の活動と重なって大変な時期もありますが、山本勲研究会では、少なくとも３年次の三田祭論文への
                                            取り組みを優先することで着実に成長し、その成長を武器に、就活などにも取り組んでもらいたいと考えています。
                                        </p>
                                        <br />
                                        <p>
                                            こうしたゼミの方針に沿えない人が入ゼミすると、グループワークが成立せず、ゼミ員全員の学びが損なわれてしまいます。
                                            入ゼミの出願にあたっては、以上のゼミの方針を十分に理解するようにしてください。
                                        </p>
                                        <br />
                                        <br />
                                    </ScrollArea>
                                    <div className={styles.checkboxContainer}>
                                        <Checkbox
                                            id="agreement"
                                            checked={agreed}
                                            onCheckedChange={handleAgreementChange}
                                        />
                                        <label
                                            htmlFor="agreement"
                                            className={styles.checkboxLabel}
                                        >
                                            以上の方針を理解したうえで山本勲研究会のエントリーシートをダウンロードし、出願する
                                        </label>
                                    </div>
                                    <div className={styles.buttonArea}>
                                        <button
                                            onClick={handleProceedToDownload}
                                            className={`${styles.downloadButton} ${
                                                agreed ? styles.enabled : ""
                                            }`}
                                            disabled={!agreed}
                                        >
                                            <DownloadIcon
                                                style={{ width: "24px", height: "24px" }}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={`${styles.scrollCard} ${styles.downloadContent}`}>
                                {filteredContent ? (
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: filteredContent.contents,
                                        }}
                                    />
                                ) : (
                                    <p>コンテンツが見つかりません</p>
                                )}
                            </div>
                        )}
                    </Card>
                </div>
            )}
        </div>
    );
};

export default ESDownloadButton;