## Subresource Integrity

If you are loading Highlight.js via CDN you may wish to use [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) to guarantee that you are using a legimitate build of the library.

To do this you simply need to add the `integrity` attribute for each JavaScript file you download via CDN. These digests are used by the browser to confirm the files downloaded have not been modified.

```html
<script
  src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.12.0/highlight.min.js"
  integrity="sha384-KnPvYPx1poT554tHDV1nuYV9sOkh4cZPBvLZQlXgJmoRQZPdgQNwL50/xq9kynp9"></script>
<!-- including any other grammars you might need to load -->
<script
  src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.12.0/languages/go.min.js"
  integrity="sha384-orYKHAs3chK3oDMQLy5ywrzoY8z9zvzfmNIjmVxKXioAUtwDhP+xf6THWYSI/43Y"></script>
```

The full list of digests for every file can be found below.

### Digests

```
sha384-a1wm3qUK29ziXmSLYix2yaud2kOpMT7apA+eoJQotbz/mWwzwr2NtGr5jVXh0+k+ /es/languages/arduino.js
sha384-7geGhB8SM3uqVqcZwbCcTMK6x0EUuTVXRUMgew1J8daA7+rXZAUH/JpDWZPEu7J2 /es/languages/arduino.min.js
sha384-NlZfC2L77r8UeTjA/p4yoiQ21AjCporI5MS6cHBe3GwuBrfSvwXnOMvHYKQveJai /es/languages/armasm.js
sha384-Fe20mDB6sPOYCFGN/TIAO0KZ3Jj9ptsuih0hCYVtz3XBiSeetOtjvZ4d28IxS4l6 /es/languages/armasm.min.js
sha384-Vqe1AEoiNcLtV2DfIX2ddu9YnDvXbzuMi4hx542iG7/t9WlE1sobqt9DHidv8/23 /es/languages/bash.js
sha384-8FqiBkFvhBoCq7xHJ8pB0H0/hBH2FJ0IHl2CcZWpINYY6uyw38RJgZNe5fddwEaa /es/languages/bash.min.js
sha384-A3L5Tf7tUTEvvb7CBQ7/Ss1TL493yDjIre9lL9+hewzsmlGvDaF0zr2jtRL/as9+ /es/languages/c.js
sha384-QjLTklOpGRj5BiUGiD7/7RYVgazp8V+oQvLPmM+goByoChSDDxbVf7ztjZ5MtHO2 /es/languages/c.min.js
sha384-Lm068HVDQtM6SZyXhRJXHaa0hWobIT2uMLFN8u7PNsmbDstY7X6RUJKI8acvPv8u /es/languages/cmake.js
sha384-KwzHwJUeSzuUbMpf1pgoYz9m9Ds2sQw62RB4FLaF016mSHMJXp02hqQSa7q9/UsS /es/languages/cmake.min.js
sha384-jJSKb0kbVcDJLL6D9Zc80g+XBwa84Ogoi6JH0dZMQJlbzn6ZCjYFE2WtU6oTc8Au /es/languages/cpp.js
sha384-p1ClIV57O7/nb8vDAVFIhZ7u0/8oonjMxc4Yd8EarzxmLPMiQAV95I0ogb+ZkEFN /es/languages/cpp.min.js
sha384-amdMjFrQeV1IlGyVyYRGeUBxPp1NVz7WG5xs0heAwCiAZLj0ISxeJwiOTeom9RfS /es/languages/css.js
sha384-rLeEizUP6J+98gF7EZ4ngav3h+slU5SqCVDahqOoYBEdjzhWQ3g6XldnqR9BSlBR /es/languages/css.min.js
sha384-dljpS1l9+O5vQxJissODJYNA0Rw9nJp43VsjEb6FyGD6B46ZBK1W1RfyGqeHMva4 /es/languages/dockerfile.js
sha384-kbkyUe6C+7Rb+UHlnDueefZESgm3YEG737vAbnSDnao1ovpiHTZAGhs0bvCyDXS8 /es/languages/dockerfile.min.js
sha384-2EqSi8m9b557gKJo7OpdrlEss1Y+m/oB6Y9OZCqV6zufAq1p+BmGr0MfPDvV6adS /es/languages/gcode.js
sha384-4J9icF/A67cRa4pM4PNZ/UOeWwhrNVq1xLPUP5ZOyOTtts341cu6g2AQSOiHaIUB /es/languages/gcode.min.js
sha384-szxUUh9N0l6P/FmAIblkcuHCevD/uQZvxzRV+3/cXGUfwkGB1lUermC0svmtpDLw /es/languages/go.js
sha384-r/ODTWqgPwC7it6O0gCXlszLaDESga+Z9PaVcIfITv1CfJ39NpFiz72b2KGWbFBQ /es/languages/go.min.js
sha384-EwVd3CFnuRZREukld14ypTfnD1MGYSHObt198ZAyUlU7VqS8G3X1QqytSOrAFc1t /es/languages/gradle.js
sha384-njt8v8LhCccOAGtpj7W5Vfec/jKsj8Iwks6Ncz+WS/zkJXZdOJCwPpoLSXv81XdB /es/languages/gradle.min.js
sha384-z9bZmXQ6WniHUvySgc0/iokrwX54kIx/ZDvUIHIwAjgHRFjLZgNKiTX3UBi5aY/4 /es/languages/java.js
sha384-WmZNtzcna3shPin4x0B8fSeXgtW14zoyha+gmtNTU53pa/ZImw0O8FmX0x06ETq+ /es/languages/java.min.js
sha384-mxaIAuwA1l6te9LMbWwt9PNtaoRiwRk1/345TMC2UQtNTi1kjbhizCrSxaHAegHF /es/languages/javascript.js
sha384-r8C5XKdITWu1xHcHMIfmqgbWZTa0w/MPyAykL+WctwUoeTsEHBo5+jSSoHQ+qFy6 /es/languages/javascript.min.js
sha384-lt0gg86v1uEAI7/c2402dN+9T2iQXopS6OJ8P1jHo1uOZu1zIV5sX8vmlOLGozq0 /es/languages/json.js
sha384-UJwfLbfKiYs+crNOV1xJL6wDet7JiH/Kav6qZ9c+cOjar4piP1X0VQqwVE3RJt+z /es/languages/json.min.js
sha384-xGBPshIOFNw8c1FRizCFABcm3XPtW3btW9YUCXA+UFtB7VptOoGPMUwPe98FuozN /es/languages/latex.js
sha384-cEZkTl0+jJEd4y22AzCjfQ8ydf3EgDLviRGOuK5YUvMo6QTLoC9hXRaNFS+anTmK /es/languages/latex.min.js
sha384-+NTDzDBVsc1IllRcPr8br1+JYEWxf/DV+uTQhZ9L+Osjl/iOYG6j4CHI4A41UWHx /es/languages/llvm.js
sha384-CpYSgwXuaV1WRGMpGdKBtIxS+/lWcHdpmkqqqGEwix/Wg1hCdHZx6IGRzk2ePdkN /es/languages/llvm.min.js
sha384-47Dn27oZJHoNVUL4leYvOLfxpXtmetYh9lZ7olKoDqzPebdZqqLE3xNY9iHEu3O/ /es/languages/lua.js
sha384-RUO5JMeXmbOe7bDSAF/Yzw4V9xXupHGlmNKK4+/UZIPdock3BGdBwaWYzM+j5se2 /es/languages/lua.min.js
sha384-btFSo3SEJNPWl4YEj99Ws4vfJOENZoIppHk/IDH2iGwIWHWA9e/DuDjj7sSQJH12 /es/languages/makefile.js
sha384-ai0V0qlpdcBs1bZEDPT9mIIFwPXiKIjVtDrDZL68xKan6TWmMxuzMKycOP42aBId /es/languages/makefile.min.js
sha384-qXAmSIiI587+IHpd/KU7WRz9snrtBhVCR5pST316BxhuxRbXzb6uWmB8WC/2eqUi /es/languages/markdown.js
sha384-atzUeXgldTnp0Vvir5hFSZ4MRX0FWOpxp7UdXca7uje0uL5S6swwfRhq5SB5Ag0m /es/languages/markdown.min.js
sha384-L2G8SrV2XkEoBHdXKK8m+lrxFrFQ9Dqb8m7OFQZWpTVeJjbdDTbmp2gvYv4ivXOS /es/languages/oxygene.js
sha384-pOBk+jJu821o56XWUINv31NzkIVfE8vx6srn5n3VkxwymSw5+8nPkO4sVC4ODHxR /es/languages/oxygene.min.js
sha384-UbOS4JomBdQgpHT9lwmZipdtIqKiJP8T2IG7oG0l6K/LnyVrSMoaPI7Hh6vWatoS /es/languages/plaintext.js
sha384-RhTHpYmm2hh4ZEkHCbk+tklVV1oUvBVYUfdesSGg3QO/JtYDmqYoycxlBJxg9Lqb /es/languages/plaintext.min.js
sha384-M29KVshhb1nOr+V9fD7zculEkusgFmZdZpLoQxEiEJ7nTncEiXzJ9/tXuofiOIYK /es/languages/python.js
sha384-1SN2ySEZrgpb2XQB4PRJli/u1Jj5sm1j+Be77jnSNNmKzhUZK8OBkGFFexuOPSHu /es/languages/python.min.js
sha384-qiJr0S5VCc1t8759xUObwojkNSGY9qsZnhF4WrRMssQm/vr/af5856XqXCpUyAVX /es/languages/rust.js
sha384-GGN+S5ob1CnW7D1agsXyjfA+lWHjZh4PXNcFl0in3hHcusBs9NgYuIvQkeK7ylxn /es/languages/rust.min.js
sha384-B2tWwx3GmC07EO8LzXOdP8ST25VZHxugHG+XTI4uPSvRGWHnTPKEWip5WweN7GnW /es/languages/shell.js
sha384-UO9hFSZLgfmMtuKIFmLhOz4OMlYKPDnZyxHVmn47vrmiTA6MqC2D/Y5rdVO49Alf /es/languages/shell.min.js
sha384-OM4xfc4TVPs7rz6MN9eHLSJ/9CMVh24GAosmLwcLAbMmUxQjG3D17BGfWSPqQpCU /es/languages/vim.js
sha384-0HK/PNSTUPG+4CcD2fEhlNyMZr3x8Odz69ki0gZkifROpqgiqyt61dzwU3ogLfVT /es/languages/vim.min.js
sha384-/FFsa5X7Nn8shMYLbVUb0WRQA+ay+XKibuVCTYwN7XJNcs3hhMaIvUEl87d6ULcv /es/languages/x86asm.js
sha384-Rkq9CZ04qdVs0aJLp8vSLGoOejY+m/XxsKFZ9BwdXW/9PFCxs6o5ebFulZXaDQRf /es/languages/x86asm.min.js
sha384-XZNCXUeNSjWoW5lAESpD8AkU5NhwkwL0a6wIzJWfMEx6qNtF29L+81oxGOy4b3Pj /es/languages/xml.js
sha384-7lgbaoMNJXxrndTFyw0ll0hq1MZzDLFkFmLhYLibSJNXgcW6xOSU9e+OS2QaAKDP /es/languages/xml.min.js
sha384-V4dEHxGPcfKe0nPj1Kf4bHhhEWQok5V5odOaTC9ADMs0bJqyVuFfVDkhTZaSWwpC /es/languages/yaml.js
sha384-nw7e1KnZnvc0mX9u7q45N8KXp4CIDO3+GsbJgpVp4Ye3b1taSPCD2+dtUlqqjTYC /es/languages/yaml.min.js
sha384-WQawFY8fMlOCRdFJ2fAPE4XGto3u4dmRXK8JePESqmT5qSc73CTrKpKL4WwK0jvz /languages/arduino.js
sha384-E6FJkg0YQwr6DdDR0LLLYf7x4jf5uhy73koai3bqN25Mw307x8y1ERpV1kpK7o17 /languages/arduino.min.js
sha384-jcgzdAzYPOUpnZIpbzW4r5fnI79hKVuxA/CXW5JnFluZcS71Nlc9aUyYSedcnbwc /languages/armasm.js
sha384-lPVdJSvbOCURN6N0fEp7MDhI9mRVUZffGHI6I63SY8afZiqUxOPAwnUeuWmTDgkC /languages/armasm.min.js
sha384-5DAFEjB/sJxmunBVtQT5pIOWPcB8/sbocTrB4vhqxJ3G38RVlxXiUInHwkdik75C /languages/bash.js
sha384-3LwgJG25r+ir+HS3WNVBMDCbzxie+2TxFfg/kMUMmtWF9mxd0dEDwFS2LGd8akPz /languages/bash.min.js
sha384-++jr2IZH8qZUHclpwLKPdPB67oloAwlp6bVn6IOBm1PRyrATGwIJDemLwIjTXWhI /languages/c.js
sha384-XUlYYDNkxUkC5F86/mGCoT9eEdPUigCR+8ihyrqFat6tMD0/GRHkorEtHKgBSS7D /languages/c.min.js
sha384-N7VBaChBo0g9ipud8RC9FW1fMn5BhxpR7Y8I4d1H493YWprFyC/Z6g8A4IIp6Vq0 /languages/cmake.js
sha384-2+d+VUsqaxDE3yoeRJxqWmX1dF5Ongwq0zKRb+NmBsIQXlRr0GTQOkDDD6eujd4k /languages/cmake.min.js
sha384-Fu6emj6YokTl+GgIHZRr4tqDnAWVGmEP67A0XguFYxkNQLhiKEgZa3J2t21BQ7Fq /languages/cpp.js
sha384-csK05VfEiSG0s/zJz067fB5PZCE5+Uo1yqgoa1zZkSG1cmBaOuXEGSbVr2YqAghu /languages/cpp.min.js
sha384-+G97Y66qjmfAEeNK5AYrOqbLn/hBNX41qhtyiVW7z3Zq/1llyjGJr3gHmNi+AVKN /languages/css.js
sha384-FvHR2wIZNmDX0TgSuoOhAZRl6R5yRi26wu2/MVXDm1ZFCGJUvotj2RrvVLGC4y88 /languages/css.min.js
sha384-4gOC/347d+9AQct8q3iBSJ1eT4EWYj4IGYX58+vwZq9bzbi204n6ZPly0NSRxh2P /languages/dockerfile.js
sha384-/zu1pI8+9j/v/qNlCRRyidiBhGdxfvGwOLXEPBXpKc77eFNUAhccr0WglEQ+x9La /languages/dockerfile.min.js
sha384-M1ZmaINw9xsaImL7aSOEkVU2bzE4tuhbFBUyaJ466YAsNlyvRWhFUq3YTny04njw /languages/gcode.js
sha384-5nVtxRRtNqyNVeeOUvL6T8lG3mzOD6p4+FxGRTPxdWFgCQB1WUgf8Ra46AuCwzJ1 /languages/gcode.min.js
sha384-JB+Is5MW6WOc+0g9Rtdr5MJ5DBFhkGV72i5St11vYSu28mXrGGOLA76MQT9sKafD /languages/go.js
sha384-orYKHAs3chK3oDMQLy5ywrzoY8z9zvzfmNIjmVxKXioAUtwDhP+xf6THWYSI/43Y /languages/go.min.js
sha384-LnbojqEHqgoG5/3NNwF/zy0I3nPolpEBr0mCo7bA8oiuLCF7k42Z+e6dQTWTF5nR /languages/gradle.js
sha384-ZMf1TkmgwGuFpXWyanMnGiBQS/hdqUrJkNZfPm3GZ/CGypwNzesT3EX03iY30WN5 /languages/gradle.min.js
sha384-Qj/fL9z0ymYPbd/2AWbWGyDfM3jjtdV4Vs4KdUS6OoIbA4AahIb3PpkR8nociDdi /languages/java.js
sha384-1OHpuM8WHOF2rIMbr6F9TXndkg39R1UtQGGfiifSXWlIthYEjIVkx94n05/gy931 /languages/java.min.js
sha384-5vRFHgNazcqNV/wYjVV73vv/mmcguTGfUhutWTMzUdixVclmxoe32uu3C1i5U+b3 /languages/javascript.js
sha384-luOC72UPK+5vw8AmdAZNVaFIY8IN7MayLzqcVcnUdCCVug/rAyhze5dpWklUZW8b /languages/javascript.min.js
sha384-xRs5pKapNPranWV1tpWwbWD8FN6u6gwlBXWwW+3wcfgCrXtc+VuTjt6Ff2MZTUoZ /languages/json.js
sha384-BuKQB2q4LIWSYzKqO0qkAQOdYLvqUmSmzUtLZDkTHy5po4tY7DSEcu/r5555QON2 /languages/json.min.js
sha384-qPceFloWMOtxMjx4f7Crri3MpwmlJgcG6/ZftZD2AkWrpMLxt28CkWEfcigZfnVH /languages/latex.js
sha384-wHW9Hcxw0oenHF2z8fGo1rhAe1jZwnp35Z6xzC29Vj/O+toSfBY9+7TrUfUnwFMD /languages/latex.min.js
sha384-UuKr3bEXkCM2LFeL/q5CRTBvKc1EPhDWPSobnt018YA5WgW0zMtK2991KATLbRX+ /languages/llvm.js
sha384-Sjmz0kyLR+Sa04KhOZIdr2mgpISO5awi4vjMFx1YJWYM2nTDkqGVLowiK4eBbzvB /languages/llvm.min.js
sha384-X7kIOhO4b0cvc9Ro4AM1xtGHL0uSrOPcvdCaVRV4R2bp0WfZ+rwq0nRA+gcYmRsU /languages/lua.js
sha384-4O9XXj4HbJ3xc7QSKua6ZC/g7oB7lUP5VJo2Otc6LY62LJVfV/Ruod9z3NLR+W2R /languages/lua.min.js
sha384-InzoelUz5Kd5nr0UlmC3zkpZcx44OV88IrddbIg35m+umNK2EHFzQynfFBn34TOC /languages/makefile.js
sha384-B/EK9u4TdeCwE+1vigZs6g3/LKhzjAu8NNjRBbWox7nAgCTtEu5ctWCayQZD/SMr /languages/makefile.min.js
sha384-E5HEb58PlD3DyF1d/ePfVyiVVyWY78cCsbBBHPtlGSEFbNDHTcMoBnlt8dHP62OU /languages/markdown.js
sha384-VEGOCRct+04gpJrYhkaah46lXsjH+/u05lA+0IwU+eqzRpr2/bcRlnoHdu2xVr6+ /languages/markdown.min.js
sha384-EeKNyeBa87boQh/p/kaCPmyFDdSqAmczhcsOSkof2TGK0IdCUVXT2LxwqaQRtRxX /languages/oxygene.js
sha384-IEnT+s4LC6SXYN5/+7QBS5aRe7Xy7nzOAjtwJwwmC7wLckcOmA+PwPN2duSzc9Du /languages/oxygene.min.js
sha384-5antmxjEm+wiK5ytnS/IhTDt8w3EK4ELSuskQjN+4wPiEPP0PE6aE65JRI9R4ZVj /languages/plaintext.js
sha384-vpQpEp61iIf7WRxlpZKYck63VGy6819HP7jPmr8BoVQ1D6Ov7Z4RR9deMn/v/6t+ /languages/plaintext.min.js
sha384-vHFyigyrxXKrLcfzhSiSgjFvq0h4IaawkRiHBKD7g4xx6ny6hQvUeIe5o0vcr2Qi /languages/python.js
sha384-MjEDnJ45PjESeDQtPkC0gdCZlwA6MWEYLl/Qw95D9e1Ow8yAlz/xkS/EDIxFiig6 /languages/python.min.js
sha384-a31URvqct+K3nz3lO55mCXLo5aeM6yEpEgpPtcU5FnkQkEBn6SmHsPbJ5T0TF0ki /languages/rust.js
sha384-LscyYEhBL0qRGRT6l+Y2jHVM3FVaF42fVHmcY9cA9NL/Vs60Owkd0iOxjAzNuS8D /languages/rust.min.js
sha384-72beB65rbLzMOcE4+YWKx5ru8/Ond638ZZwF6NlcoledcqrIWooTDsjNuAzieK1u /languages/shell.js
sha384-laOtV6vhnnfvegRPIJtGS2eVsVZ71Kh6gTxOoDhXpl91W1i6NYgtojnE+PFKWm0c /languages/shell.min.js
sha384-79kg9lBJ0sQXYZuyTcYZUrqoZvgysQhpyASlahsKbEvGgXf36yZ0ok+MFA7udF0+ /languages/vim.js
sha384-DTGwkXgxP7GFYuQl4t3iMY6owPfm43tBw2AH4LerV9I5DFgSRSDzAueQvoSykx2S /languages/vim.min.js
sha384-xebVCRDgDosTvpLuJmoJn/2/WFYgcgJkVcMAh4kNwgbC/gThZaYEaqMVTDXtk0fP /languages/x86asm.js
sha384-Cf3xzgfOHCjwxHFvuO1cpP6GHSth3EMwNXmQ1fdOonZL5fHRQx6cICV3YkQ74oVu /languages/x86asm.min.js
sha384-NNLNlM+AFtDXFlKRhmVO4gnfAl8a6U0y/QRO+jb8Cbx/1wYFSjpS8XF3mexCbQ7x /languages/xml.js
sha384-1iugfrw26YFHz7tD9aJCXklIDFXhf2qx4cJGfo4T8mWP+9nwOCnZpq0PqoXqcpO5 /languages/xml.min.js
sha384-QiM+6eBaRFHV4SXe9mvWNsiQXkInig0NsYzM6aIHbVEcgJ2j4WDRKSjUBTkqLUjg /languages/yaml.js
sha384-3Z1ACXMaXuAS5eP39k4q24JKpbbb3hxVfEYQuXhujNu4KZSYl/BepBcMrSys6psg /languages/yaml.min.js
sha384-IaVFlnWCJ60Q7zDW3nxxAfbv1JIXqPZy7z04+s1tmDnJnPagQWhs8UKezWK+fj/j /highlight.js
sha384-N0qOVovqQ4fSrPHNh56OlVNAw7UuQNUDsxztvLBa/1ueTpONsb3X5Kp7K91vB8iE /highlight.min.js
```

